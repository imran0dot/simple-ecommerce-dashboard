export class DateFormatter {
  static toReadable(date: string | Date | undefined): string {
    if (!date) return '—';

    const d = new Date(date);
    
    // চেক করা হচ্ছে তারিখটি ভ্যালিড কি না
    if (isNaN(d.getTime())) return 'Invalid Date';

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);
  }

 
  static toDateTime(date: string | Date | undefined): string {
    if (!date) return '—';
    const d = new Date(date);

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(d);
  }
}