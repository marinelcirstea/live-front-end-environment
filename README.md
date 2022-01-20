# Static projects

I know.. I had no inspiration. I was thinking about codepence at some point, but that just sounds cheaper than PoundLand.

## What's this?

A mini clone of codepen.io

## Why?

Because I find it easier to store my projects/components in a single place and then just come back to them and copy-paste whatever I want.

## HOW?

```sh
git clone git@github.com:marinelcirstea/live-front-end-environment.git
```

```sh
npm install
```

```
Make sure you have a firebase and mongodb atlas account.
Create a file called '.env.local'
Copy-paste what's in '.env.local.example' and fill the info with your details
```

```sh
npm run dev
```

## NOTES

```
[1] NOT TESTED IN PRODUCTION YET!
```

```
[2] THIS IS JUST THE PROTOTYPE, LOTS OF CHANGES ARE COMING IN THE FUTURE
```

## Near Future

```
[1] A way to take png/jpg/svg snapshots of the DOM
and upload them to firebase storage(google cloud storage bucket).

I'm thinking about replacing the iframes with images
and just add a button to see the component live in a modal,
(pointless to load the editor if you just want to see it)
```

```
[2] Head options (like the css base, normalize.css, reset.css, etc)
```

```
[3] A way to "install" js modules. I might just add them as script tags(seems less of a headache), but we'll see.
```
