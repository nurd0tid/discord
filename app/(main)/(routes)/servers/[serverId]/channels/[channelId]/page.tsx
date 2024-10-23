import React from "react";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

// Buat variabel serverUrl yang memuat env
const serverUrl = process.env.NEXT_PUBLIC_BASE_LIVEKIT_URL || "";

export default async function ChannelIdPage({ params: { channelId, serverId } }: ChannelIdPageProps) {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const channel = await db.channel.findUnique({
    where: { id: channelId },
  });

  const member = await db.member.findFirst({
    where: { serverId: serverId, profileId: profile.id },
  });

  if (!channel || !member) return redirect("/");

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader name={channel.name} serverId={channel.serverId} type="channel" />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && <MediaRoom chatId={channel.id} video={false} audio={true} serverUrl={serverUrl} />}
      {channel.type === ChannelType.VIDEO && <MediaRoom chatId={channel.id} video={true} audio={true} serverUrl={serverUrl} />}
    </div>
  );
}
