# Frontend debugging (suggestions)

## Problem 1: Weird background placements and grid clashing

**Cause(identified):** The use of flexbox (or flex containers) was clashing at different places:

### Changes Suggested:

The changes made can be done as follows:

```bash
git pull #from the wiki project directory on your mac

# now all the changes are pulled to your loal environment BUT on a different branch named "fix"
git checkout fix #moves to the new branch

#now view the differences/changes i madde in your code (in each and every file)
git diff HEAD origin/main # compares origin with the branch "main"
```

The new ones, begin with ' - ' and the old one

- first of all there might be some formatting changes (like change in indentation or tags getting fixed from _!DOCTYPE_ to _!doctype_), due to the autoformatter (_prettier_) I use. That's okay tho, don't mind 😅
-
