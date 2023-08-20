import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Alert,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const JoinRoomCard = ({ joinRoom }) => {
  const [values, setValues] = useState({
    username: "",
    room: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "Testing Alert message",
    color: "green",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleJoin = () => {
    if (values.username === "" || values.room === "") {
      setAlert({
        show: true,
        message: "Username & Room ID is Required",
        color: "red",
      });
    } else if (values.username && values.room !== "") {
      joinRoom(values);
      setValues({
        username: "",
        room: "",
      });
    }
  };
  useEffect(() => {
    if (alert.show === true) {
      const timer = setTimeout(() => {
        setAlert({
          show: false,
          message: "alert message",
          color: "green",
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Join Room
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          required
          value={values.username}
          name="username"
          onChange={handleChange}
          label="Name"
          type="text"
          size="lg"
        />
        <Input
          required
          onChange={handleChange}
          value={values.room}
          name="room"
          label="Room ID"
          type="text"
          size="lg"
          onKeyUp={(e) => {
            e.key === "Enter" && handleJoin();
          }}
        />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth onClick={handleJoin}>
          Join
        </Button>
        {alert.show === true ? (
          <Alert
            className="mt-3 h-10 flex items-center text-sm"
            color={alert.color}
            icon={<ExclamationTriangleIcon className="w-5 h-5" />}
          >
            {alert.message}
          </Alert>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default JoinRoomCard;
