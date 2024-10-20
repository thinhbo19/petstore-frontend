"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCartTemp } from "@/src/services/Redux/CartTempSlice";

const DeleteCartTemp = () => {
  const pathName = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathName !== "/payment") {
      dispatch(setCartTemp([]));
    }
  }, [pathName, dispatch]);

  return null;
};

export default DeleteCartTemp;
