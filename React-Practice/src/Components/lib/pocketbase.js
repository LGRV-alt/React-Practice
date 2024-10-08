import PocketBase from "pocketbase";

// const url = `${import.meta.env.VITE_POCKETBASE}`;
const client = new PocketBase("https://hortiloader.pockethost.io");
client.autoCancellation(false);
export const isUserValid = client.authStore.isValid;
export async function getTasks() {
  return await client.collection("tasks").getFullList();
}

// function to update the record from the edit section
export async function updateTask(
  id,
  title,
  other,
  weekNumber,
  day,
  postcode,
  orderNumber,
  customerType,
  orderInfo,
  status
) {
  const data = {
    title: title,
    other: other,
    weekNumber: weekNumber,
    day: day,
    postcode: postcode,
    orderNumber: orderNumber,
    customerType: customerType,
    orderInfo: orderInfo,
    status: status,
  };
  await client.collection("tasks").update(id, data);
  // history.go(0);
}

export async function login(username, password) {
  try {
    await client.collection("users").authWithPassword(username, password);
    window.location.reload();
  } catch (error) {
    console.log(error);
    console.log(error.data);
    if (error.data.code) {
      alert("Invalid username or password");
    }
  }
}

export function signout() {
  client.authStore.clear();
  window.location.reload();
}
export async function signup(username, password) {
  const data = {
    username: username,
    password: password,
    passwordConfirm: password,
  };
  try {
    await client.collection("users").create(data);
    alert("User Created");
  } catch (error) {
    console.log("Error:", error);
    console.log(error.data);
    if (error.data.data.username.code) {
      alert("user already exist");
    }
  }
}

// ---------------------Brought Over----------------------

export async function deleteTask(id) {
  await client.collection("tasks").delete(id);
}

export async function taskStatus(id, title, status) {
  const data = {
    title: title,
    id: id,
    status: status,
  };
  await client.collection("tasks").update(id, data);
}

export async function createTask(
  title,
  day,
  postcode,
  orderNumber,
  customerType,
  other,
  weekNumber,
  orderInfo,
  status
) {
  const data = {
    title: title,
    day: day,
    postcode: postcode,
    orderNumber: orderNumber,
    customerType: customerType,
    user: client.authStore.model.id,
    other,
    weekNumber,
    orderInfo,
    status: status,
  };
  await client.collection("tasks").create(data);
}

export function getDateWeek(date) {
  const currentDate = typeof date === "object" ? date : new Date();
  const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
  const daysToNextMonday =
    januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
  const nextMonday = new Date(
    currentDate.getFullYear(),
    0,
    januaryFirst.getDate() + daysToNextMonday
  );

  return currentDate < nextMonday
    ? 52
    : currentDate > nextMonday
    ? Math.ceil((currentDate - nextMonday) / (24 * 3600 * 1000) / 7)
    : 1;
}
