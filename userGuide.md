# Sertifikat Builder - User Guide

## Purpose

**Sertifikat Builder** is a web application that lets you create professional certificate templates with drag-and-drop elements, custom backgrounds, and export to PDF. Design multi-page certificates with text, signature boxes, and custom elements—all with automatic saving.

**Access:** Public (no login required)

---

## Powered by Manus

This application is built with cutting-edge technology:

- **Frontend:** React 19 + TypeScript + Tailwind CSS 4 + Shadcn/UI components
- **State Management:** Zustand with localStorage persistence
- **Drag & Drop:** React-RND for intuitive element positioning and resizing
- **PDF Export:** html2canvas + jsPDF for high-quality certificate generation
- **Backend:** Express 4 + tRPC 11 (ready for future enhancements)
- **Database:** MySQL with Drizzle ORM (ready for user accounts and templates)
- **Deployment:** Auto-scaling infrastructure with global CDN

---

## Using Your Website

### Step 1: Create Your Certificate Template

When you first open Sertifikat Builder, you'll see a blank A4-sized canvas (297mm × 210mm). Start by giving your project a name in the **PROJECT NAME** field at the top.

### Step 2: Add a Background Image

Click the "**Upload Background**" button in the top-right corner. You can either:
- Upload an image file from your device (PNG, JPG, GIF)
- Paste an image URL from the web

The canvas will automatically resize to match your background image dimensions. If you don't add a background, the default A4 landscape size is used.

### Step 3: Add Elements to Your Certificate

Use the toolbar buttons to add elements:
- Click "**Jabatan**" to add a position/title text element
- Click "**Signature Box**" to add a signature area (shown as a dashed box)
- Click "**Nama Penandatangan**" to add a signer's name field
- Click "**Custom Text**" to add any custom text element

Each element appears on the canvas with a default position and size.

### Step 4: Position and Customize Elements

- **Drag elements:** Click and drag any element to move it anywhere on the canvas
- **Resize elements:** Drag the edges of an element to resize it
- **Select an element:** Click an element to select it (it will show a blue border)
- **Edit properties:** With an element selected, use the right panel to:
  - Change the text content
  - Adjust font size (8px to 72px)
  - Set text alignment (left, center, right)
  - Change text color using the color picker

### Step 5: Manage Multiple Pages

The left panel shows your page list. You can:
- Click "**Add**" to create a new page (each page can have a different background)
- Click a page to switch between pages
- Click the trash icon to delete a page (you must have at least one page)

### Step 6: Export Your Certificate

When you're satisfied with your design, click the "**Export PDF**" button in the top-right corner. Your certificate will be downloaded as a PDF file with all pages included.

### Automatic Saving

Your work is automatically saved to your browser every 5 seconds. If you close the browser and return later, your project will be restored exactly as you left it.

---

## Managing Your Website

### Settings & Customization

Access the Management UI (click the icon in the top-right corner) to:

- **Dashboard:** View analytics and visibility settings for your published site
- **Settings:** Update your website name, logo, and domain configuration
- **Database:** Manage stored data (if you upgrade to add user accounts)

### Exporting Your Work

All certificates are exported as PDF files. The PDF dimensions automatically match your background image size, or use A4 landscape (297mm × 210mm) if no background is set.

---

## Next Steps

Talk to Manus AI anytime to request changes or add features. Some ideas for future enhancements:

- Save and manage multiple certificate templates
- Create a library of pre-designed templates
- Add user accounts to save projects in the cloud
- Batch generate certificates with data import
- Add more element types (images, QR codes, barcodes)

Start designing your first certificate now—just add a background and drag elements into place!
