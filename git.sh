#/bin/sh

git pull origin master --rebase
git add -A .
git commit -m "Update"
git push origin master
