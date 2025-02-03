import { Button, Card, IconButton, Input, Skeleton, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { MagnifyingGlass } from "../../assets/icons/magnifying-glass";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { UserModel } from "../../models/user.model";
import { IsLoading } from "../shared/is-loading";
import { UserAvatarInfo } from "../shared/user-info";

type UserCardProps = {
  user: UserModel;
  selectedUser: UserModel | null;
  setSelectedUser: (user: UserModel | null) => void;
  hasMe?: boolean;
};

type TeamSearchProps = {
  currentUser: UserModel;
  users: UserModel[];
  selectedUser: UserModel | null;
  setSelectedUser: (user: UserModel | null) => void;
  isloading: boolean;
};

const UserCard = ({ user, selectedUser, setSelectedUser, hasMe }: UserCardProps) => (
  <Card
    variant="plain"
    onClick={() => {
      selectedUser?.id === user.id ? setSelectedUser(null) : setSelectedUser(user);
    }}
    sx={{
      cursor: "pointer",
      bgcolor: "neutral.white",
      border: "1px solid",
      borderColor: selectedUser?.id === user.id ? "subvisual.primary" : "neutral.white",
      p: 1.5,
      "&:hover": {
        border: "1px solid",
        borderColor: selectedUser?.id === user.id ? "danger.500" : "subvisual.primary"
      }
    }}
  >
    <UserAvatarInfo user={user} fontSize={14} hasMe={hasMe} isRow />
  </Card>
);

export const TeamSearch = ({ currentUser, users, selectedUser, setSelectedUser, isloading }: TeamSearchProps) => {
  const [search, setSearch] = useState<string>("");

  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const sortedUsers = search
    ? filteredUsers
    : selectedUser
      ? [selectedUser, ...filteredUsers.filter(user => user.id !== selectedUser.id)]
      : filteredUsers;

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
          <Input
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            startDecorator={<MagnifyingGlass sx={{ fontSize: 14 }} />}
            endDecorator={
              search && (
                <IconButton
                  variant="plain"
                  onClick={() => setSearch("")}
                  sx={{ transform: "rotate(45deg)", borderRadius: 20 }}
                >
                  <PlusSignOutlined sx={{ fontSize: 14 }} />
                </IconButton>
              )
            }
            sx={{ borderRadius: 20, pl: 2 }}
          />
          <Button variant="outlined" disabled>
            Compare
          </Button>

          {isloading ? (
            <IsLoading />
          ) : (
            <Stack maxHeight={400} overflow="auto" gap={2}>
              {sortedUsers.map(user => {
                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    hasMe={currentUser.id === user.id}
                  />
                );
              })}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
