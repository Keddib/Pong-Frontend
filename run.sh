if [ "$ENVIRONMENT" == "production" ]; then
  echo 'Run Production';
  npm run build
  npm run production
else
  echo 'Run Development';
  npm run dev
fi
