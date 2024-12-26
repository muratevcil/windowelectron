const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      alwaysOnTop: true,         // Keep the window always on top
      transparent: true,          // Enable transparency
      frame: false,               // Remove the default window frame
      resizable: false,           // Optional: Disable resizing for a fixed HUD-like window
      fullscreen:true,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
      },
    });
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setAlwaysOnTop(true, 'screen-saver', 1);

  // Load the external URL
  win.loadURL("http://192.168.1.123:3000"); // Replace with your actual URL
  win.setIgnoreMouseEvents(true,'screen');

  // Intercept and prevent keyboard events
  win.webContents.on('before-input-event', (event) => {
    event.preventDefault(); // Prevents all keyboard input from affecting the window
  });
  setInterval(() => {
    if (win.isMinimized()) {
        win.restore();
    }
    win.focus();
}, 200);

}


// Initialize the app
app.whenReady().then(()=>{createWindow()});

// Ensure the app quits completely on close
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
