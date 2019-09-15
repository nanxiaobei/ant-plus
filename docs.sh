yarn sync
git add .
git commit -m "📲 Sync docs"

yarn docz build
git add .
git commit -m "🎉 Update site"
git push
