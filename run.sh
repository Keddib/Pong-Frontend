if [ -d "node_modules" ]; then
  rm -rf node_modules dist .parcel-cache
fi

npm install

if [ "$ENVIRONMENT" == "production" ]; then
  echo 'Run Production';
  npm run build
  npm run production
else
  echo 'Run Development';
  npm run dev
fi
