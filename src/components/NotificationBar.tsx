import notifications from "@/data/notifications.json";

export default function NotificationBar() {
  const text = notifications.messages.join("    •   •    ");

  return (
    <div className="notification-wrapper">
      <div
        className="notification-track"
        style={{
          animationDuration: `${notifications.speed}s`
        }}
      >
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}