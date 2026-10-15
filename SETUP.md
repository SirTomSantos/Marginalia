# Marginalia: set up your own copy (about 20 minutes, once)

You will do three things: put the app online, get a free Google "key" so it can save to your Google Drive, and add the app to your phone.
Do Parts 1 and 2 on a computer. Part 3 is on your phone.

---

## Part 1. Put the app online (5 minutes)

Pick ONE option.

### Option A: GitHub Pages (free, permanent)
1. Go to github.com and make a free account (or sign in).
2. Click the **+** at the top right, then **New repository**.
3. Name it `marginalia`. Leave it **Public**. Click **Create repository**.
4. Click **uploading an existing file**.
5. Open the unzipped `marginalia-app` folder on your computer. Select EVERYTHING inside it (`index.html`, `config.js`, `sw.js`, `manifest.webmanifest`, the `lib` folder, the `icons` folder) and drag it into the GitHub page.
   If `.nojekyll` is hidden on your computer, that's fine. You can skip it.
6. Scroll down and click **Commit changes**.
7. Go to **Settings**, then **Pages** (left side). Under "Build and deployment", set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**. Click **Save**.
8. Wait one minute and refresh. GitHub shows your link: `https://YOURNAME.github.io/marginalia/`

Write down this part: **`https://YOURNAME.github.io`**. That is your *origin* for Part 2. It has no `/marginalia` on the end and no trailing slash.

### Option B: Netlify Drop (fastest)
1. Go to app.netlify.com/drop and drag the whole `marginalia-app` folder onto the page.
2. Create the free account when asked so the link stays alive.
3. Your link looks like `https://something-random.netlify.app`. That whole address is your *origin*.

---

## Part 2. Get your Google key (10 minutes)

Use the Google account where you want your library stored.

1. Go to **console.cloud.google.com** and sign in.
2. At the top, click the project picker, then **New project**. Name it `Marginalia`. Click **Create** and make sure it is selected.
3. **Turn on the Drive API.** Menu (three lines) > **APIs & Services** > **Library**. Search **Google Drive API**, open it, click **Enable**.
4. **Set up the consent screen.** Menu > **Google Auth Platform** (or **APIs & Services > OAuth consent screen**).
   - Click **Get started**.
   - App name: `Marginalia`. Support email: your email. Click Next.
   - Audience: **External**. Click Next.
   - Contact email: your email. Agree to the terms. Click **Create**.
5. **Give it permission to store files.** Open **Data Access** (or "Scopes"). Click **Add or remove scopes**. Find and tick this one:
   `.../auth/drive.appdata` ("See, create, and delete its own configuration data in your Google Drive").
   Click **Update**, then **Save**.
6. **Add yourself.** Open **Audience**. Under **Test users** click **Add users** and add your own Gmail address (add any other account you will use too). Save.
   You can leave the app in "Testing". That is fine for personal use.
7. **Create the key.** Open **Clients** (or **Credentials > Create credentials > OAuth client ID**).
   - Application type: **Web application**. Name: `Marginalia web`.
   - Under **Authorized JavaScript origins**, click **Add URI** and paste your *origin* from Part 1 (for example `https://YOURNAME.github.io`).
   - Click **Create**.
8. Copy the **Client ID**. It looks like `123456789-abc123.apps.googleusercontent.com`. (You do not need the "client secret".)
9. **Put the Client ID in the app.** On GitHub, open `config.js`, click the pencil icon (Edit), and replace `PASTE_YOUR_CLIENT_ID_HERE` with your Client ID. Keep the quote marks. Click **Commit changes**.
   (On Netlify: edit `config.js` in the folder on your computer and drag the folder onto the same site again.)

Menu names move around a little between Google updates. If one is missing, look for the same words nearby.

---

## Part 3. First use, and putting it on your phone

1. Open your link in the browser. The status line says "Not connected to Google Drive yet."
2. Tap **Connect Google Drive**, pick your account, and allow it.
   - If Google says "Google hasn't verified this app", tap **Advanced**, then **Go to Marginalia**. This is your own app, so it is expected.
3. The status line should say **Synced**.
4. **Add it to your phone**
   - iPhone: open the link in **Safari**, tap Share, then **Add to Home Screen**.
   - Android: open the link in **Chrome**, tap the three dots, then **Install app** (or **Add to Home screen**).
   It then opens like a normal app and works offline.
5. On every other phone or computer, open the same link and tap Connect once.

### Bring over your existing library from the Claude version
In the Claude version tap **Back up library** (it saves a file). In your new app tap **Restore backup** and choose that file. It uploads to your Drive automatically.

---

## How it behaves

- **Where your data lives.** In a private, hidden app folder in your Google Drive. Only this app can see it, and it counts toward your Drive space (15 GB free). You will not see the files in the Drive website. To wipe it: Google Account > Security > Third-party access > Marginalia > Delete hidden app data.
- **Sign-in lasts about an hour.** The app reconnects by itself when you open it. If your browser blocks that, the status line shows **Reconnect Google Drive**. Tap it. Your notes are never lost, because everything is also saved on the device first.
- **Offline.** You can read, mark and write notes with no signal. Changes upload the next time you are online and connected.
- **Big files.** There is no 20 MB limit. Large files upload in a resumable way. Very large files (hundreds of MB) need a good connection.
- **Updating the app.** Replace `index.html` (and anything else I send) in GitHub. Your devices pick it up the next time you open the app (sometimes after opening it twice). To force it, change the version number at the top of `sw.js`.
- **Back up anyway.** Tap **Back up library** now and then. It is a second copy that does not depend on Google.

## If something goes wrong

| What you see | What to do |
|---|---|
| Status says "Add your Google client ID" | `config.js` has not been saved with your key. Check it, wait a minute, refresh twice. |
| Google says **origin_mismatch** | The origin in step 7 is wrong. It must match your address exactly: https, no `/marginalia`, no trailing slash. |
| Google says **Access blocked** or "app not verified" | Add your account under **Test users** (step 6). |
| Status says **Drive 403** or "access not configured" | The Drive API is not enabled (step 3). |
| Status says **Your Google Drive is full** | Free up space in Google Drive, then tap **Sync now**. |
| Connect window does nothing | Allow pop-ups for your site, then tap Connect again. |
