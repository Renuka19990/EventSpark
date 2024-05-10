// import React from "react";
import { Button } from "@chakra-ui/react";

const ElegantButton = () => {
  return (
    <Button
      width="10em"
      height="3.5em"
      border="3px ridge #149CEA"
      outline="none"
      backgroundColor="transparent"
      color="white"
      transition="1s"
      borderRadius="0.3em"
      fontSize="16px"
      fontWeight="bold"
      cursor="pointer"
      position="relative"
      _hover={{
        boxShadow: "inset 0px 0px 25px #1479EA",
        _before: { transform: "scale(0)" },
        _after: { transform: "scale(0)" },
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: "80%",
        left: "3%",
        width: "95%",
        height: "40%",
        backgroundColor: "#212121",
        transition: "0.5s",
        transformOrigin: "center",
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: "-10px",
        left: "3%",
        width: "95%",
        height: "40%",
        backgroundColor: "#212121",
        transition: "0.5s",
        transformOrigin: "center",
      }}
    >
      Button
    </Button>
  );
};

export default ElegantButton;
