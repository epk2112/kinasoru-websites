import os

def generate_tree(startpath, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        for root, dirs, files in os.walk(startpath):
            level = root.replace(startpath, '').count(os.sep)
            indent = '  ' * level
            f.write(f'{indent}{os.path.basename(root)}/\n')
            subindent = '  ' * (level + 1)
            for file in files:
                f.write(f'{subindent}{file}\n')

if __name__ == '__main__':
    directory = input("Enter the directory path: ")
    output_file = input("Enter the output file name (e.g., tree_structure.txt): ")
    
    if os.path.exists(directory):
        generate_tree(directory, output_file)
        print(f"Folder tree structure has been saved to {output_file}")
    else:
        print("The specified directory does not exist.")