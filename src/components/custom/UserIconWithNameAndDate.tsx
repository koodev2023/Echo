import Image from "next/image";

const UserIconWithNameAndDate = ({
  username,
  userImageUrl,
  date,
}: {
  username: string;
  userImageUrl: string;
  date: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <h1 className="text-lg font-semibold min-w-max">
        {userImageUrl && (
          <Image
            src={userImageUrl}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            className="rounded-full"
          />
        )}
      </h1>
      <div className="flex flex-col gap-0 items-start justify-center h-min">
        <h1 className="text-lg font-medium leading-tight">{username}</h1>
        <h1 className="text-sm font-medium text-muted-foreground leading-tight">
          {date}
        </h1>
      </div>
    </div>
  );
};

export default UserIconWithNameAndDate;
