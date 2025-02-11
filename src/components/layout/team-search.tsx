import { Button, Card, IconButton, Input, Skeleton, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { MagnifyingGlass } from "../../assets/icons/magnifying-glass";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { UserModel } from "../../models/user.model";
import { getColorHex } from "../../utils/get-color-hex";
import { getColorTransparency } from "../../utils/get-color-transparency";
import { IsLoading } from "../shared/is-loading";
import { UserAvatarInfo } from "../shared/user-info";

type UserCardProps = {
  user: UserModel;
  selectedUser: UserModel | null;
  setSelectedUser: (user: UserModel | null) => void;
  isComparing: boolean;
  selectedUsersArray: UserModel[];
  setSelectedUsersArray: (users: UserModel[]) => void;
  setActiveTab: (activeTab: string | number | null) => void;
  hasMe?: boolean;
};

type TeamSearchProps = {
  currentUser: UserModel;
  users: UserModel[];
  selectedUser: UserModel | null;
  setSelectedUser: (user: UserModel | null) => void;
  isComparing: boolean;
  setIsComparing: (boolean: boolean) => void;
  selectedUsersArray: UserModel[];
  setSelectedUsersArray: (users: UserModel[]) => void;
  setActiveTab: (activeTab: string | number | null) => void;
  isLoading: boolean;
};

const UserCard = ({
  user,
  selectedUser,
  setSelectedUser,
  isComparing,
  selectedUsersArray,
  setSelectedUsersArray,
  setActiveTab,
  hasMe
}: UserCardProps) => {
  const isUserAlreadyBeingCompared = selectedUsersArray.some(u => u.id === user.id);
  const isUserAlreadySelected = selectedUser?.id === user.id;
  const isSelected = isUserAlreadyBeingCompared || isUserAlreadySelected;
  return (
    <Card
      component="button"
      variant="plain"
      onClick={() => {
        if (isComparing) {
          if (isUserAlreadyBeingCompared) {
            setSelectedUsersArray(selectedUsersArray.filter(u => u.id !== user.id));
          } else {
            setSelectedUsersArray([...selectedUsersArray, user]);
          }
        } else {
          if (isUserAlreadySelected) {
            setSelectedUser(null);
          } else {
            setSelectedUser(user);
          }
          setActiveTab(0);
        }
      }}
      sx={{
        cursor: "pointer",
        bgcolor: isSelected ? getColorTransparency(getColorHex("primary"), 10) : "neutral.white",
        border: "1px solid",
        borderColor: isSelected ? "subvisual.primary" : "neutral.white",
        p: 1.5,
        "&:hover": {
          bgcolor: isSelected ? "neutral.lighter" : getColorTransparency(getColorHex("primary"), 10),
          border: "1px solid",
          borderColor: isSelected ? "neutral.baseLighter" : "subvisual.primary"
        }
      }}
    >
      <UserAvatarInfo user={user} fontSize={14} hasMe={hasMe} isRow />
    </Card>
  );
};

export const TeamSearch = ({
  currentUser,
  users,
  selectedUser,
  setSelectedUser,
  isComparing,
  setIsComparing,
  selectedUsersArray,
  setSelectedUsersArray,
  setActiveTab,
  isLoading
}: TeamSearchProps) => {
  const [search, setSearch] = useState<string>("");

  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Card variant="plain" sx={{ bgcolor: "neutral.lightest", maxWidth: 256 }}>
      <Stack gap={2}>
        <Stack gap={1}>
          <Typography level="title-lg" fontWeight={700}>
            Subvisual Team
          </Typography>
          {isLoading ? <Skeleton variant="text" /> : <Typography level="body-md">{users.length} members</Typography>}
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
          <Button
            variant="solid"
            onClick={() => {
              setSelectedUser(null);
              setIsComparing(!isComparing);
              setSelectedUsersArray([]);
            }}
            sx={{ ...(isComparing && { bgcolor: "subvisual.primaryDark" }) }}
          >
            Compare
          </Button>

          {isLoading ? (
            <IsLoading />
          ) : (
            <Stack maxHeight={400} overflow="auto" gap={2} pr={1}>
              {filteredUsers.map(user => {
                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    isComparing={isComparing}
                    selectedUsersArray={selectedUsersArray}
                    setSelectedUsersArray={setSelectedUsersArray}
                    setActiveTab={setActiveTab}
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
