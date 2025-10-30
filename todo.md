# Sertifikat Builder - Project TODO

## Core Features
- [x] Upload background sertifikat (URL atau file upload)
- [x] Default A4 horizontal size (297mm x 210mm) jika tidak ada background
- [x] Drag & drop elemen (Teks Jabatan, Kotak Tanda Tangan, Nama Penandatangan)
- [x] Custom text element dengan edit teks dan font-size
- [x] Text alignment (left, center, right) untuk elemen teks
- [x] Delete elemen functionality
- [x] Multi-page support untuk sertifikat
- [x] Setiap halaman bisa punya background berbeda
- [x] Preview real-time hasil desain
- [x] Export ke PDF dengan ukuran mengikuti background
- [x] Autosave ke localStorage

## UI Components
- [x] Upload background component
- [x] Toolbar untuk menambah elemen
- [x] Canvas/editor area untuk drag & drop
- [x] Element properties panel (edit teks, font-size, alignment)
- [x] Page management panel (tambah/hapus halaman)
- [x] Preview dan export buttons

## State Management & Storage
- [x] Zustand setup untuk state management
- [x] localStorage integration untuk autosave
- [x] Persist posisi elemen
- [x] Persist teks dan styling elemen

## Technical Implementation
- [x] React-RND setup untuk drag & drop + resize
- [x] html2canvas + jsPDF untuk export PDF
- [x] Image dimension detection untuk ukuran kertas
- [x] TypeScript types untuk elemen dan halaman

## Testing & Polish
- [ ] Test drag & drop functionality
- [ ] Test PDF export dengan berbagai ukuran background
- [ ] Test localStorage persistence
- [ ] Test multi-page functionality
- [ ] Fix responsive design issues
- [ ] Improve UI/UX polish

## Bug Fixes & Improvements
- [x] Fix oklch color function error in html2canvas
- [x] Add zip compression for project export
- [ ] Improve PDF export quality
- [ ] Add error handling for image loading
- [ ] Optimize canvas rendering performance
- [ ] Fix element z-index management
- [ ] Add validation for element positioning

## Completed Implementation
- [x] Phase 1: Project initialization with Next.js and dependencies
- [x] Phase 2: State management with Zustand and localStorage
- [x] Phase 3: UI components (upload, toolbar, properties, pages)
- [x] Phase 4: Drag & drop with react-rnd
- [x] Phase 5: PDF export functionality
- [ ] Phase 6: Testing and refinements
- [ ] Phase 7: Final delivery to user
