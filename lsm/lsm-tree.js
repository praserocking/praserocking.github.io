// LSM Tree Implementation
class LSMTree {
    constructor() {
        this.memtable = new Map();
        this.levels = [[], [], []]; // Level 0, 1, 2
        this.wal = []; // Write-Ahead Log
        this.memtableLimit = 5;
        this.stats = {
            writes: 0,
            reads: 0,
            compactions: 0,
            walEntries: 0
        };
        this.sstableCounter = 0;
        this.walCounter = 0;
    }

    write(key, value) {
        // Show write process visualization
        this.showWriteProcess();
        
        // Step 1: Write to WAL first (for durability)
        this.writeToWAL(key, value);
        
        setTimeout(() => {
            // Step 2: Add to memtable
            this.memtable.set(key, {
                value: value,
                timestamp: Date.now(),
                deleted: false
            });
            this.stats.writes++;
            this.log(`WRITE: ${key} = ${value} (WAL → Memtable)`, 'write');
            
            // Step 3: Acknowledge write completion
            setTimeout(() => {
                this.completeWriteProcess();
                
                if (this.memtable.size >= this.memtableLimit) {
                    this.flushMemtable();
                }
                
                this.updateVisualization();
            }, 200);
        }, 300);
    }

    writeToWAL(key, value) {
        const walEntry = {
            id: ++this.walCounter,
            key: key,
            value: value,
            timestamp: Date.now(),
            operation: 'WRITE'
        };
        
        this.wal.push(walEntry);
        this.stats.walEntries++;
        
        // Keep WAL size manageable (in real systems, WAL is periodically truncated)
        if (this.wal.length > 20) {
            this.wal.shift();
        }
        
        this.renderWAL();
        this.log(`WAL: Entry ${walEntry.id} written to disk`, 'flush');
    }

    showWriteProcess() {
        const processDiv = document.getElementById('writeProcess');
        processDiv.style.display = 'flex';
        
        // Reset all steps
        ['step1', 'step2', 'step3'].forEach(id => {
            const step = document.getElementById(id);
            step.className = 'write-step';
        });
        
        // Animate steps
        setTimeout(() => document.getElementById('step1').className = 'write-step active', 100);
        setTimeout(() => {
            document.getElementById('step1').className = 'write-step completed';
            document.getElementById('step2').className = 'write-step active';
        }, 400);
        setTimeout(() => {
            document.getElementById('step2').className = 'write-step completed';
            document.getElementById('step3').className = 'write-step active';
        }, 700);
    }

    completeWriteProcess() {
        document.getElementById('step3').className = 'write-step completed';
        setTimeout(() => {
            document.getElementById('writeProcess').style.display = 'none';
        }, 1000);
    }

    renderWAL() {
        const walElement = document.getElementById('walEntries');
        walElement.innerHTML = '';
        
        // Show last 10 WAL entries
        const recentEntries = this.wal.slice(-10);
        recentEntries.forEach((entry, index) => {
            const walDiv = document.createElement('div');
            walDiv.className = 'wal-entry';
            if (index === recentEntries.length - 1) {
                walDiv.className += ' writing';
            }
            walDiv.textContent = `[${entry.id}] ${entry.operation}: ${entry.key}=${entry.value}`;
            walElement.appendChild(walDiv);
        });
        
        // Auto-scroll to bottom
        walElement.scrollTop = walElement.scrollHeight;
    }

    read(key) {
        this.stats.reads++;
        
        // Check memtable first
        if (this.memtable.has(key)) {
            const entry = this.memtable.get(key);
            if (!entry.deleted) {
                this.log(`READ: ${key} found in memtable = ${entry.value}`, 'read');
                return entry.value;
            }
        }
        
        // Check SSTables from newest to oldest
        for (let level = 0; level < this.levels.length; level++) {
            if (level === 0) {
                // L0: Must check all files due to overlapping keys
                this.log(`READ: Checking L0 (${this.levels[0].length} files - overlapping keys)`, 'read');
                for (let i = this.levels[level].length - 1; i >= 0; i--) {
                    const sstable = this.levels[level][i];
                    if (sstable.has(key)) {
                        const entry = sstable.get(key);
                        if (!entry.deleted) {
                            this.log(`READ: ${key} found in L0 SSTable ${sstable.id} = ${entry.value}`, 'read');
                            return entry.value;
                        } else {
                            this.log(`READ: ${key} found but deleted in L0`, 'read');
                            return null;
                        }
                    }
                }
            } else {
                // L1+: Can use binary search due to non-overlapping ranges
                if (this.levels[level].length > 0) {
                    this.log(`READ: Checking L${level} (${this.levels[level].length} files - non-overlapping)`, 'read');
                    for (let i = this.levels[level].length - 1; i >= 0; i--) {
                        const sstable = this.levels[level][i];
                        if (sstable.has(key)) {
                            const entry = sstable.get(key);
                            if (!entry.deleted) {
                                this.log(`READ: ${key} found in L${level} SSTable ${sstable.id} = ${entry.value}`, 'read');
                                return entry.value;
                            } else {
                                this.log(`READ: ${key} found but deleted in L${level}`, 'read');
                                return null;
                            }
                        }
                    }
                }
            }
        }
        
        this.log(`READ: ${key} not found in any level`, 'read');
        return null;
    }

    delete(key) {
        this.write(key, null, true);
    }

    flushMemtable() {
        if (this.memtable.size === 0) return;
        
        const sstable = new Map(this.memtable);
        sstable.id = ++this.sstableCounter;
        sstable.timestamp = Date.now();
        
        this.levels[0].push(sstable);
        this.memtable.clear();
        
        this.log(`FLUSH: Memtable flushed to Level 0 (SSTable ${sstable.id})`, 'flush');
        
        // Trigger compaction if needed
        this.checkCompaction();
        this.updateVisualization();
    }

    checkCompaction() {
        // Level 0: compact when we have 3+ SSTables (reduced for demo)
        if (this.levels[0].length >= 3) {
            this.compactLevel(0);
        }
        
        // Level 1: compact when we have 4+ SSTables (reduced for demo)
        if (this.levels[1].length >= 4) {
            this.compactLevel(1);
        }
    }

    compactLevel(level) {
        if (level >= this.levels.length - 1) return;
        
        this.stats.compactions++;
        const sourceLevel = this.levels[level];
        const targetLevel = this.levels[level + 1];
        
        // Merge all SSTables in the source level
        const mergedData = new Map();
        const compactingSSTables = [...sourceLevel];
        
        // Add visual indication of compaction
        this.showCompactionIndicator(level);
        
        // Log the compaction details
        if (level === 0) {
            this.log(`COMPACT: L0→L1 - Merging ${compactingSSTables.length} overlapping files`, 'compact');
        } else {
            this.log(`COMPACT: L${level}→L${level+1} - Sorted merge of ${compactingSSTables.length} files`, 'compact');
        }
        
        setTimeout(() => {
            // Merge data from all SSTables, keeping the latest version of each key
            compactingSSTables.forEach(sstable => {
                for (const [key, entry] of sstable) {
                    if (!mergedData.has(key) || entry.timestamp > mergedData.get(key).timestamp) {
                        mergedData.set(key, entry);
                    }
                }
            });
            
            // Create new SSTable for target level
            if (mergedData.size > 0) {
                const newSSTable = new Map(mergedData);
                newSSTable.id = ++this.sstableCounter;
                newSSTable.timestamp = Date.now();
                
                // Add level-specific metadata
                newSSTable.level = level + 1;
                newSSTable.keyRange = this.getKeyRange(mergedData);
                
                targetLevel.push(newSSTable);
                
                this.log(`COMPACT: Created SSTable ${newSSTable.id} in L${level+1} with ${mergedData.size} keys`, 'compact');
            }
            
            // Clear source level
            this.levels[level] = [];
            
            this.hideCompactionIndicator(level);
            this.updateVisualization();
            
            // Check if further compaction is needed
            this.checkCompaction();
        }, 1000);
    }

    getKeyRange(dataMap) {
        const keys = Array.from(dataMap.keys()).sort();
        return keys.length > 0 ? `${keys[0]}..${keys[keys.length - 1]}` : '';
    }

    showCompactionIndicator(level) {
        const levelElement = document.getElementById(`level${level}`).parentElement;
        const indicator = document.createElement('div');
        indicator.className = 'compaction-indicator';
        indicator.textContent = 'COMPACTING';
        indicator.id = `compact-indicator-${level}`;
        levelElement.querySelector('.level-info').appendChild(indicator);
    }

    hideCompactionIndicator(level) {
        const indicator = document.getElementById(`compact-indicator-${level}`);
        if (indicator) {
            indicator.remove();
        }
    }

    log(message, type) {
        const logEntries = document.getElementById('logEntries');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logEntries.appendChild(entry);
        logEntries.scrollTop = logEntries.scrollHeight;
        
        // Keep only last 50 entries
        while (logEntries.children.length > 50) {
            logEntries.removeChild(logEntries.firstChild);
        }
    }

    updateVisualization() {
        this.renderMemtable();
        this.renderLevels();
        this.updateStats();
    }

    renderMemtable() {
        const memtableElement = document.getElementById('memtable');
        memtableElement.innerHTML = '';
        
        for (const [key, entry] of this.memtable) {
            const item = document.createElement('div');
            item.className = 'data-item new';
            item.textContent = `${key}:${entry.value}`;
            memtableElement.appendChild(item);
            
            // Remove 'new' class after animation
            setTimeout(() => item.classList.remove('new'), 300);
        }
    }

    renderLevels() {
        for (let level = 0; level < this.levels.length; level++) {
            const levelElement = document.getElementById(`level${level}`);
            const countElement = document.getElementById(`level${level}Count`);
            
            levelElement.innerHTML = '';
            countElement.textContent = `${this.levels[level].length} files`;
            
            this.levels[level].forEach((sstable, index) => {
                const sstableDiv = document.createElement('div');
                sstableDiv.style.display = 'inline-block';
                sstableDiv.style.margin = '5px';
                sstableDiv.style.padding = '5px';
                sstableDiv.style.border = '1px solid #ccc';
                sstableDiv.style.borderRadius = '3px';
                sstableDiv.style.backgroundColor = '#fff';
                sstableDiv.style.fontSize = '10px';
                
                const header = document.createElement('div');
                header.style.fontWeight = 'bold';
                header.style.marginBottom = '3px';
                header.style.color = level === 0 ? '#dc3545' : level === 1 ? '#fd7e14' : '#28a745';
                
                let headerText = `SSTable ${sstable.id}`;
                if (sstable.keyRange) {
                    headerText += ` [${sstable.keyRange}]`;
                }
                if (level === 0) {
                    headerText += ' (overlapping)';
                }
                
                header.textContent = headerText;
                sstableDiv.appendChild(header);
                
                for (const [key, entry] of sstable) {
                    const item = document.createElement('div');
                    item.className = 'data-item';
                    item.textContent = `${key}:${entry.value}`;
                    sstableDiv.appendChild(item);
                }
                
                levelElement.appendChild(sstableDiv);
            });
        }
    }

    updateStats() {
        document.getElementById('totalWrites').textContent = this.stats.writes;
        document.getElementById('totalReads').textContent = this.stats.reads;
        document.getElementById('totalCompactions').textContent = this.stats.compactions;
        document.getElementById('currentMemtableSize').textContent = this.memtable.size;
        document.getElementById('walEntries').textContent = this.stats.walEntries;
    }

    clear() {
        this.memtable.clear();
        this.levels = [[], [], []];
        this.wal = [];
        this.stats = { writes: 0, reads: 0, compactions: 0, walEntries: 0 };
        this.sstableCounter = 0;
        this.walCounter = 0;
        document.getElementById('logEntries').innerHTML = '';
        document.getElementById('searchResult').innerHTML = '';
        document.getElementById('walEntries').innerHTML = '';
        this.updateVisualization();
        this.log('CLEAR: All data cleared including WAL', 'flush');
    }

    setMemtableLimit(limit) {
        this.memtableLimit = limit;
        this.log(`CONFIG: Memtable limit set to ${limit}`, 'flush');
    }
}

// Initialize LSM Tree
const lsmTree = new LSMTree();

// UI Functions
function writeData() {
    const key = document.getElementById('key').value.trim();
    const value = document.getElementById('value').value.trim();
    
    if (!key || !value) {
        alert('Please enter both key and value');
        return;
    }
    
    lsmTree.write(key, value);
    
    // Clear inputs
    document.getElementById('key').value = '';
    document.getElementById('value').value = '';
}

function readData() {
    const key = document.getElementById('searchKey').value.trim();
    
    if (!key) {
        alert('Please enter a key to search');
        return;
    }
    
    const result = lsmTree.read(key);
    const resultDiv = document.getElementById('searchResult');
    
    if (result !== null) {
        resultDiv.innerHTML = `<div class="search-result found">Found: ${key} = ${result}</div>`;
    } else {
        resultDiv.innerHTML = `<div class="search-result not-found">Not found: ${key}</div>`;
    }
    
    // Clear search input
    document.getElementById('searchKey').value = '';
}

function forceCompaction() {
    lsmTree.flushMemtable();
    lsmTree.compactLevel(0);
}

function generateBulkData() {
    // Generate 20 key-value pairs quickly to trigger multiple compactions
    for (let i = 0; i < 20; i++) {
        const key = `bulk_key_${i}`;
        const value = `bulk_value_${Math.floor(Math.random() * 1000)}`;
        lsmTree.write(key, value);
    }
}

function clearAll() {
    lsmTree.clear();
}

// Update memtable size limit
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('memtableSize').addEventListener('change', function() {
        lsmTree.setMemtableLimit(parseInt(this.value));
    });

    // Handle Enter key in form inputs
    document.getElementById('key').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('value').focus();
        }
    });

    document.getElementById('value').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            writeData();
        }
    });

    document.getElementById('searchKey').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            readData();
        }
    });

    // Initialize visualization
    lsmTree.updateVisualization();
    updateClock();
    
    // Welcome message
    lsmTree.log('LSM Tree Visualizer with WAL started', 'flush');
    lsmTree.log('Use manual input or "Generate Bulk Data" for operations', 'flush');
    lsmTree.log('Click "Generate Bulk Data" to see compactions in action!', 'flush');
});

// Clock functionality
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = 
        `System Time: ${now.toLocaleTimeString()} | Uptime: ${Math.floor((Date.now() - startTime) / 1000)}s`;
}

const startTime = Date.now();
setInterval(updateClock, 1000);

// Auto-generate functionality removed - only manual and bulk inserts allowed
