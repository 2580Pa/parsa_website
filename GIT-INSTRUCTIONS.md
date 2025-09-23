# Git Update Instructions

## Manual Git Commands

Since there's an issue with the terminal, please run these commands manually in your terminal:

### 1. Add all files to staging
```bash
git add .
```

### 2. Commit changes with detailed message
```bash
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
```

### 3. Push to GitHub
```bash
git push origin main
```

## Files Modified

### Core Files
- `index.html` - Added data attributes for translation
- `script.js` - Complete translation system rewrite
- `styles.css` - Enhanced RTL/LTR support

### New Files
- `CHANGELOG.md` - Detailed changelog for v2.0
- `.gitignore` - Git ignore file
- `update-git.bat` - Windows batch script for git update
- `update-git.ps1` - PowerShell script for git update
- `git-commands.txt` - Text file with git commands
- `GIT-INSTRUCTIONS.md` - This instruction file

## What's New in v2.0

### Translation System Improvements
- **Professional translation system** with data attributes
- **Enhanced Persian translations** with better terminology
- **Complete RTL/LTR support** for both languages
- **Form translation** for all placeholders and labels
- **Automatic language detection** based on IP location
- **Smooth language switching** without page reload

### Technical Improvements
- **Simplified codebase** - Removed complex hardcoded translations
- **Better performance** - More efficient translation process
- **Maintainable structure** - Easy to add new translations
- **Error handling** - Robust translation system with fallbacks

## Testing

After updating, test the following:
1. **Language Detection**: Visit from different locations
2. **Language Toggle**: Click EN/FA button
3. **All Elements**: Check that all text translates correctly
4. **Forms**: Verify form placeholders translate
5. **RTL/LTR**: Check text direction changes properly

## Next Steps

1. Run the git commands above
2. Test the website functionality
3. Verify all translations work correctly
4. Update any additional content as needed

---

*This update significantly improves the user experience for both Persian and English users.*
