import { Autocomplete, Avatar, Button, Card, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { MagnifyingGlass } from "../../assets/icons/magnifying-glass";
import { UserModel } from "../../models/user.model";

type UserCardProps = {
  user: UserModel;
  isCurrentUser?: boolean;
};

type TeamSearchProps = {
  currentUser: UserModel;
  users: UserModel[];
};

const UserCard = ({ user, isCurrentUser }: UserCardProps) => (
  <Card variant="plain" sx={{ bgcolor: "neutral.white", p: 1.5 }}>
    <Stack direction="row" alignItems="center" gap={1}>
      <Avatar size="lg" />
      <Stack gap={0.5}>
        <Typography level="body-sm" fontSize={14} fontWeight={700}>
          {user.name} {isCurrentUser && "(me)"}
        </Typography>
        <Typography level="body-sm" fontSize={14}>
          {user.title}
        </Typography>
      </Stack>
    </Stack>
  </Card>
);

export const TeamSearch = ({ currentUser, users }: TeamSearchProps) => {
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
          <Typography>{users.length} members</Typography>
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
          <Stack maxHeight={400} overflow="auto" gap={2}>
            {!search && <UserCard user={currentUser} isCurrentUser />}

            {filteredUsers.map(user => {
              return <UserCard key={user.id} user={user} />;
            })}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
