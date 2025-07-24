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

The new ones, begin with ' - ' and the old one.

1. first of all there might be some formatting changes (like change in indentation or tags getting fixed from _!DOCTYPE_ to _!doctype_), due to the autoformatter (_prettier_) I use. That's okay tho, don't mind 😅

2. One more thing, maybe you didn't save App.jsx before commiting but the import command for Navbar in App.jsx was fcked. VERY SMALL mistake, you imported `navbar.jsx` instead of `Navbar.jsx` :)

3. since you want the whole page to be dark, you should put `bg-dark` in the root div instead of seaprately in navbar and body div (because both div will also have margin between them which results the weird white line on your page between the above two). Also, use `<nav>` instead of `<div>` ....Why? idk, it's a convention :)

4. Now, you need to understand a very important thing, what is a flexbox?? In simple words it's a container which has the ability of being a container AND an item at the same tiem ... Soo, why do we need that? Because it has certain preset padding + margin setup along with the ability to easily align things to center using `justify-content` and `align-items` attributes.

   - But why am I explaining that here? Because, as you'll see in the git diff command output, you made flex container for the Wiki heading and the inout box SEPARATELY (by putting the `d-flex` attribute to both their parent div). And, you only applied the alignment tags to the header div (which made the alignment WEIRD).

**Now the Main thing causing the disaster of EVERYTHING:**

5. As you'll see in the git diff output for **index.css** file, I've commented out the line `display:flex` which, i am guessing, was given by default. Why this caused a disaster? Because now that the **body** was a container, the items inside it (root) were items FIRST and then containers within themselves. And this makes a weird column error thing, where your root div was given a certain width from its parent container (i.e. body) and rest was empty space. Commenting it out fixed the whole background thing issue ....

With the above changes, it's all fixed now. For more understanding of what a **flexbox** or **containers** are, watch [zachgoll's flexbox crash course](https://youtu.be/zJSY8tbf_ys?si=Zz6EjJ_NEGCCQjVf&t=65788) .
