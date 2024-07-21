import axios from "axios";
import getSession from "./getSession";
import prisma from "@/lib/prismadb";

export async function CreateApiKey() {
  const user = await getSession();
  if (!user) return null;
  const headers = {
    id: user?.user.id,
  };
  try {
    const res = await axios.post(`http://localhost:3000/api/api-key`, {
      params: {
        userId: user?.user.id,
      },
    });
    return res;
  } catch (error) {
    return null;
  }
}

export async function GetApiKeys() {
  const user = await getSession();
  if (!user) return null;
  const headers = {
    id: user?.user.id,
  };
  try {
    const res = await axios.get(`http://localhost:3000/api/api-key`, {
      params: {
        userId: user?.user.id,
      },
    });
    return res;
  } catch (error) {
    return null;
  }
}
