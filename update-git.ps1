Write-Host "Updating GitHub repository..." -ForegroundColor Green

Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "feat: Professional translation system overhaul

- Complete restructure of translation system for better accuracy
- Added data attributes approach for systematic translations  
- Enhanced Persian translations with professional terminology
- Improved RTL/LTR support for both languages
- Better user experience with smooth language switching
- Added comprehensive translation coverage for all elements
- Updated README with detailed translation system documentation
- Added CHANGELOG.md for version tracking

Technical improvements:
- Simplified translation logic using data attributes
- Automatic language detection based on IP location
- Form translation support for placeholders and labels
- Better performance and maintainability
- Enhanced error handling and fallbacks"

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "Update completed successfully!" -ForegroundColor Green

