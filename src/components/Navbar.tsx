import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { Apple, BarChart2, PlusCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg py-2 px-4 md:top-0 md:bottom-auto z-50">


      <div className="container max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="md:flex items-center gap-2 hidden">
            <span className="text-lg font-semibold text-green-600 flex items-center">
              <Apple className="h-6 w-6 mr-2 text-green-500" />
              Daily Bite
            </span>
          </div>
          
          <div className="w-full md:w-auto flex justify-around md:gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors",
                  isActive && "text-green-600 font-medium"
                )
              }
              end
            >
              <BarChart2 className="h-6 w-6 mb-1" />
              <span className="text-xs">Dashboard</span>
            </NavLink>

            <NavLink
              to="/add-food"
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors",
                  isActive && "text-green-600 font-medium"
                )
              }
            >
              <PlusCircle className="h-6 w-6 mb-1" />
              <span className="text-xs">Add Food</span>
            </NavLink>

            <NavLink
              to="/food-log"
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors",
                  isActive && "text-green-600 font-medium"
                )
              }
            >
              <Apple className="h-6 w-6 mb-1" />
              <span className="text-xs">Food Log</span>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors",
                  isActive && "text-green-600 font-medium"
                )
              }
            >
              <Settings className="h-6 w-6 mb-1" />
              <span className="text-xs">Settings</span>
            </NavLink>
          </div>

          <div className="md:flex items-center gap-2 hidden">
            <span className="text-sm text-gray-500">
              {format(new Date(), "EEEE, MMM d")}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;