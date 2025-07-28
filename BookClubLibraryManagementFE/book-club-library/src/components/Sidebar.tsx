import { useState } from "react"
import { User } from "lucide-react"
import {useNavigate} from "react-router-dom";


interface SidebarItem {
    id: string
    label: string
}


const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("dashboard")
    const [isCollapsed, setIsCollapsed] = useState(false)

    const navigate = useNavigate()

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId)
        if (itemId === "dashboard") navigate(`/dashboard`)
        else navigate(`/dashboard/${itemId}`)
    }

    const sidebarItems: SidebarItem[] = [
        {
            id: "dashboard",
            label: "Dashboard",
        },
        {
            id: "readers",
            label: "Readers",
        },
        {
            id: "books",
            label: "Books",
        },
        {
            id: "lendings",
            label: "Lendings",
        },
    ]

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-indigo-900 text-white transition-all duration-300 ease-in-out ${
                    isCollapsed ? "w-16" : "w-55"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-indigo-800">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-xl font-bold text-white">🧑‍🎓LibraryApp</h1>
                    </div>

                    <button
                        className="p-2 rounded-lg hover:bg-indigo-800 transition-colors"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6">
                    <ul className="space-y-2 px-4">
                        {sidebarItems.map((item) => {
                            const isActive = activeItem === item.id

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleItemClick(item.id)}
                                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                                            isActive
                                                ? "bg-indigo-700 text-white shadow-lg"
                                                : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
                                        }`}
                                        title={isCollapsed ? item.label : ""}
                                    >
                    <span
                        className={`${
                            isCollapsed ? "w-6 h-6" : "w-5 h-5"
                        } flex-shrink-0`}
                    >
                    </span>
                                        {!isCollapsed && (
                                            <span className="font-medium">{item.label}</span>
                                        )}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* User Profile Section */}
                {!isCollapsed && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-800">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-indigo-700 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-indigo-200" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    John Librarian
                                </p>
                                <p className="text-xs text-indigo-300 truncate">
                                    Administrator
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
