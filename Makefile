CURRENT_DIR := $(shell pwd)
TARGET_DIR  := ../flizzermdx-nextjs-template-gitless/

# .SILENT:

help:
	echo "init for "

init-template:
	rsync -av --exclude='.git' --exclude='.next' --exclude='node_modules' --exclude='.gitignore' ./ $(TARGET_DIR)
	cd $(TARGET_DIR)

	git init -b main
	git add .
	git commit -m "[chore] Initialize FlizzerMDX template"

	gh repo create nextjs-template --public --source=. --remote=origin --push

	cd $(CURRENT_DIR)
	sudo rm -rf $(TARGET_DIR)

push-template:
	rsync -av --exclude='.git' --exclude='.next' --exclude='node_modules' --exclude='.gitignore' ./ $(TARGET_DIR)
	cd $(TARGET_DIR)

	git init -b main
	git add .
	git commit -m "[chore] Initialize FlizzerMDX template"

	gh repo set-remote FlizzerMDX/nextjs-template
	git push -u origin main

	cd $(CURRENT_DIR)
	sudo rm -rf $(TARGET_DIR)
