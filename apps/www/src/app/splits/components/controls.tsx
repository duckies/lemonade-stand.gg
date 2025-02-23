import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@lemonade-stand/ui";
import { useAuth } from "~/app/splits/atoms";
import { CharacterForm } from "~/app/splits/components/character-form";

export function Controls() {
  const { user, status, error, logout } = useAuth();

  if (status === "pending") {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Uh-oh</CardTitle>
          <CardDescription>{error?.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Run the /auth bot command anywhere in the Guild Discord and visit the provided link to
            login.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>
            Hello, {user.rank} {user.username}
          </CardTitle>
        </CardHeader>
        {/* <CardContent></CardContent> */}
        <CardFooter>
          <Button variant="link" onClick={logout}>
            Logout
          </Button>
        </CardFooter>
      </Card>

      <CharacterForm />
    </>
  );
}
