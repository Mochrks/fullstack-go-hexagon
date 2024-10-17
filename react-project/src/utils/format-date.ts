
export const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);

    // Format tanggal menjadi dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan mulai dari 0
    const year = date.getFullYear();

    // Format waktu menjadi HH:MM
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`; // Format akhir: dd/mm/yyyy HH:MM
}