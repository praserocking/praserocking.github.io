#!/usr/bin/env python3
"""
Script to convert markdown file to single line format
"""

import sys

def convert_markdown_to_single_line(markdown_file_path):
    """
    Read markdown file and convert it to a single line with proper escaping
    """
    try:
        with open(markdown_file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Convert to single line by replacing newlines with \n
        single_line_content = content.replace('\n', '\\n').replace('\r', '')
        
        # Escape double quotes for JSON
        single_line_content = single_line_content.replace('"', '\\"')
        
        return single_line_content
    
    except FileNotFoundError:
        print(f"Error: File '{markdown_file_path}' not found.")
        return None
    except Exception as e:
        print(f"Error reading file: {e}")
        return None

def main():
    if len(sys.argv) != 2:
        print("Usage: python convert_markdown.py <markdown_file>")
        sys.exit(1)
    
    markdown_file = sys.argv[1]
    
    print(f"Converting {markdown_file} to single line format...")
    
    single_line = convert_markdown_to_single_line(markdown_file)
    
    if single_line:
        print("\nSingle line content:")
        print("=" * 50)
        print(single_line)
        
        # Save to file
        output_file = f"{markdown_file.rsplit('.', 1)[0]}_single_line.txt"
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(single_line)
        
        print(f"\nSingle line content saved to: {output_file}")
        print(f"Content length: {len(single_line)} characters")
    else:
        print("Failed to convert markdown file.")

if __name__ == "__main__":
    main()
