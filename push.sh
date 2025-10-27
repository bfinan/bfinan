# Gets your repo up to date

git -c http.sslVerify=false pull
git add .
git status
git commit -m "new commit"
git -c http.sslVerify=false push 


