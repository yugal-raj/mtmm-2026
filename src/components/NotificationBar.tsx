import Link from "next/link";
import { Fragment } from "react";
import notifications from "@/data/notifications.json";

type Notification = { icon?: string; text: string; link?: string; linkText?: string };

function Messages({ hidden = false }: { hidden?: boolean }) {
  const messages = notifications.messages as Notification[];

  return (
    <span aria-hidden={hidden || undefined}>
      {messages.map((message, index) => (
        <Fragment key={index}>
          {message.icon && (
            // WHY: 22px (vs 14px message text) makes the emoji icons clearly visible
            <span className="inline-block align-middle text-[22px] leading-none mr-2" aria-hidden="true">{message.icon}</span>
          )}
          {message.text}
          {message.link && (
            <>
              {" "}
              <Link
                href={message.link}
                tabIndex={hidden ? -1 : undefined}
                className="notification-link"
              >
                {message.linkText ?? "Click here"}
              </Link>
            </>
          )}
          {/* WHY: Separator after every message (including the last) so the join between the two looping copies also gets a dot */}
          <span className="notification-separator">•</span>
        </Fragment>
      ))}
    </span>
  );
}

export default function NotificationBar() {
  return (
    <div className="notification-wrapper" role="region" aria-label="Announcements">
      <div
        className="notification-track"
        style={{
          animationDuration: `${notifications.speed}s`
        }}
      >
        <Messages />
        {/* WHY: Second copy makes the -50% translate loop seamlessly; hidden from screen readers */}
        <Messages hidden />
      </div>
    </div>
  );
}
