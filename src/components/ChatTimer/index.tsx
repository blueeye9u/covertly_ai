import React, { useEffect, useState, useRef } from "react";
import { useConversation } from "../../context/conversation.context";
import { useRouter } from "next/router";
import { chatService } from "../../services/chat.service";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import useLoggedInUser from "../../hooks/useLoggedInUser";

import Timer from "./timer";

dayjs.extend(utc);
dayjs.extend(timezone);

const ChatTimer = ({ createdAt, id }: any) => {
  const [user] = useLoggedInUser();
  const [armProgress, setArmProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const { setChatMessages, setConversationMessages, chatMessages }: any =
    useConversation();
  const router = useRouter();

  const filterChats = async () => {
    try {
      const tempChats = [...chatMessages];
      setChatMessages(tempChats.filter((ele) => ele._id !== id));
      router.replace(router.pathname, undefined, { shallow: true });
      setConversationMessages([]);
      await chatService.deleteChatById(id);
    } catch (error) {
      console.log("error--->", error);
    }
  };

  const calculateTimeDifference = () => {
    const chatDeletionDays = user?.chatDeletionDays || 1;
    const createdAtMoment = dayjs.tz(createdAt, "UTC");
    const createdAtPlusDays = createdAtMoment.add(chatDeletionDays, "day");
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const createdAtLocal = createdAtPlusDays.tz(userTimezone);
    const now = dayjs().tz(userTimezone);
    const diffInHours = createdAtLocal.diff(now, "hour");
    return diffInHours;
  };

  const updateTimer = () => {
    const hoursLeft = Math.abs(calculateTimeDifference());
    const chatDeletionDays = user?.chatDeletionDays || 1;
    const totalHours = chatDeletionDays * 24;
    setTimeLeft(hoursLeft);
    setArmProgress((360 / totalHours) * (totalHours - hoursLeft));

    if (hoursLeft <= 0) {
      filterChats();
    }
  };

  const animate = () => {
    updateTimer();
    if (isHovered) {
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  useEffect(() => {
    updateTimer();
  }, [createdAt, user?.chatDeletionDays]);

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-label="Chat timer interaction"
      style={{ display: "inline-block" }}
    >
      <Timer id={id} armProgress={armProgress} timeLeft={timeLeft} />
    </button>
  );
};

export default React.memo(ChatTimer);