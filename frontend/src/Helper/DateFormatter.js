export default function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const diffInMs = now - date;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}`;
  const timeAgo = `${diffInHours} hours ago`;

  return `${formattedDate} (${timeAgo})`;
}
