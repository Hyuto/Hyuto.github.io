from sys import argv
from json import load
from coloredlogs import install
import os, logging, shutil

def CopyDir(src:str, dst:str, symlinks:bool=False, ignore=None):
    """
    Copy all items in src dir to dsr dir
    Args:
        src ([str]): Source DIR
        dst ([str]): Destination DIR
        symlinks (bool, optional): Defaults to False.
        ignore ([type], optional): Defaults to None.
    """
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s):
            shutil.copytree(s, d, symlinks, ignore)
        else:
            shutil.copy2(s, d)

def MoveDir(src:str, dst:str):
    """
    Move all items in src DIR to dst DIR
    Args:
        src ([str]): Source DIR
        dst ([str]): Destination DIR
    """
    list_item = os.listdir(src)
    for item in list_item:
        shutil.move(os.path.join(src, item), dst)

if __name__ == "__main__":
    # Install coloredlogs
    install()

    # get args
    args = argv[1:]
    DIR, TO_DIR = args

    # get config
    with open('migrate-config.json') as f:
        config = load(f)

    # Checking Dest DIR
    if not os.path.isdir(TO_DIR):
        logging.warning(f"{TO_DIR} Not Found")
        logging.warning(f"Making New DIR {TO_DIR}")
        os.mkdir(TO_DIR) # Make DIR

    # Is dest DIR vacant?
    if os.listdir(TO_DIR) != []:
        logging.warning(f"{TO_DIR} is not empty")
        logging.warning(f"Moving items in {TO_DIR} to ./backup")
        os.mkdir("backup")
        MoveDir(TO_DIR, "backup") # Move to backup

    logging.info(f"Copying File From {DIR}")
    CopyDir(DIR, TO_DIR) # Copy to dst dir

    # Removing excluding item
    logging.info(f"Removing Excluded Items")
    to_remove = []
    for root, dirs, files in os.walk(TO_DIR):
        for file in files:
            if file in config['excludeFile']:
                to_remove.append(os.path.join(root, file))
        for folder in dirs:
            if folder in config['excludeFolder']:
                to_remove.append(os.path.join(root, folder))

    for item in to_remove:
        logging.info(f'Removing {item}')
        if os.path.isdir(item):
            shutil.rmtree(item, ignore_errors=True)
        else:
            os.remove(item)