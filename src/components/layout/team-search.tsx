import { Autocomplete, Button, Card, Skeleton, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { MagnifyingGlass } from "../../assets/icons/magnifying-glass";
import { UserModel } from "../../models/user.model";
import { IsLoading } from "../shared/is-loading";
import { UserInfo } from "../shared/user-info";

type UserCardProps = {
  user: UserModel;
  hasMe?: boolean;
};

type TeamSearchProps = {
  currentUser: UserModel;
  users: UserModel[];
  isloading: boolean;
};

const UserCard = ({ user, hasMe }: UserCardProps) => (
  <Card variant="plain" sx={{ bgcolor: "neutral.white", p: 1.5 }}>
    <UserInfo user={user} fontSize={14} withAvatar hasMe={hasMe} isRow />
  </Card>
);

export const TeamSearch = ({ currentUser, users, isloading }: TeamSearchProps) => {
  const [search, setSearch] = useState<string>("");

  const filteredUsers = users
    .filter(user => user.id !== currentUser.id)
    .filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Card variant="plain" sx={{ bgcolor: "neutral.lightest", maxWidth: 256 }}>
      <Stack gap={2}>
        <Stack gap={1}>
          <Typography level="title-lg" fontWeight={700}>
            Subvisual Team
          </Typography>
          {isloading ? <Skeleton variant="text" /> : <Typography level="body-md">{users.length} members</Typography>}
        </Stack>

        <Stack gap={2}>
          <Autocomplete
            placeholder="Search"
            options={filteredUsers.map(user => user.name)}
            onInputChange={(_, newValue) => setSearch(newValue || "")}
            freeSolo
            startDecorator={<MagnifyingGlass sx={{ fontSize: 16 }} />}
            sx={{ borderRadius: 20, pl: 2 }}
          />
          <Button>Compare</Button>

          {isloading ? (
            <IsLoading />
          ) : (
            <Stack maxHeight={400} overflow="auto" gap={2}>
              {!search && <UserCard user={currentUser} hasMe />}
              {filteredUsers.map(user => {
                return <UserCard key={user.id} user={user} />;
              })}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
