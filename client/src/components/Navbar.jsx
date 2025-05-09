import { AppContext } from "@/context/AppContext";
import { Menu, School } from "lucide-react";
import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/DarkMode";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


import { Link, useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const { token, setToken, setShowLogin, showLogin, userData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const user = false;

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b-2 dark:border-b-gray-80 fixed top-0 left-0 right-0 duration-300 z-10 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      {/*Desktop */}
      <div className=" max-w-7xl mx-auto hidden lg:flex justify-between items-center  gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <h1
            onClick={() => navigate("/")}
            className="hidden md:block font-extrabold text-2xl cursor-pointer"
          >
            On-Go Learn
          </h1>
        </div>

        {/* User Icons and dark mode icon */}
        <div className="flex items-center gap-8">
          {token ? (
            <DropdownMenu className="cursor-pointer">
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    className="cursor-pointer"
                    src={userData?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback className="cursor-pointer">
                    {userData?.name?.[0].toUpperCase() || "N/A"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="cursor-pointer">
                  <DropdownMenuItem asChild>
                    <Link to="/my-learnings">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {userData?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/admin/course">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setShowLogin(true)} variant="outline">
              Login
            </Button>
          )}

          <DarkMode />
        </div>
      </div>
      {/* Mobile Device */}
      <div className="flex lg:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl" onClick={() => navigate("/")}>
          OngoLearn
        </h1>
        {token ? (
          <MobileNavbar />
        ) : (
          <Button onClick={() => setShowLogin(true)} variant="outline">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { token, setToken, setShowLogin, showLogin, userData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200"
          variant="outline"
        >
          <Menu className="dark:bg-gray-950" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-white dark:bg-gray-950 w-3/5 px-4 py-6">
      
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to={"/"}>OngoLearn</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col items-center space-y-4">
          <SheetClose asChild>
            <Link   to="/my-learnings">My Learning</Link>
          </SheetClose>
          <Separator className="mr-2" />
          <SheetClose asChild>
            <Link   to="/profile">Profile</Link>
          </SheetClose>
          <Separator className="mr-2" />
          <SheetClose asChild>
          <Button variant="ghost" onClick={logout}>Logout</Button>
          </SheetClose>
          <Separator className="mr-2" />
        </nav>
        {userData?.role === "instructor" && (
          <div className="flex flex-col items-center space-y-4  ">
            <SheetClose asChild>
               
                <Link   to="/admin/course"><Button className="w-full">Courses</Button></Link>
             
            </SheetClose>
            <Separator className="mr-2" />
            <SheetClose asChild>
               
                <Link   to="/admin/add-lecturer"><Button className="w-full">Add Lecturers</Button></Link>
              
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
