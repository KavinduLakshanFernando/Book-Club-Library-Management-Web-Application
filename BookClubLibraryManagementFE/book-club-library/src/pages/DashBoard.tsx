import { useState } from 'react';
import {
    BookOpen,
    Users,
    Calendar,
    DollarSign,
    TrendingUp,
    TrendingDown,
    User,
    Bell,
    Search,
    Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function DashBoard() {
    const [notifications] = useState(3);

    const monthlyData = [
        { month: 'Jan', revenue: 4200, books: 45 },
        { month: 'Feb', revenue: 4800, books: 52 },
        { month: 'Mar', revenue: 5200, books: 48 },
        { month: 'Apr', revenue: 4900, books: 55 },
        { month: 'May', revenue: 5800, books: 62 },
        { month: 'Jun', revenue: 6200, books: 58 }
    ];

    const borrowingTrend = [
        { week: 'Week 1', borrowed: 45 },
        { week: 'Week 2', borrowed: 52 },
        { week: 'Week 3', borrowed: 48 },
        { week: 'Week 4', borrowed: 65 },
        { week: 'Week 5', borrowed: 58 },
        { week: 'Week 6', borrowed: 72 }
    ];

    const statsCards = [
        {
            title: 'Total Members',
            value: '1,250',
            change: '+12%',
            trend: 'up',
            subtitle: 'from last month',
            icon: Users,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Total Books',
            value: '8,950',
            change: '+8%',
            trend: 'up',
            subtitle: 'from last month',
            icon: BookOpen,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600'
        },
        {
            title: 'Books Borrowed',
            value: '342',
            change: '-5%',
            trend: 'down',
            subtitle: 'from last month',
            icon: Calendar,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600'
        },
        {
            title: 'Monthly Revenue',
            value: '$6,750.50',
            change: '+15%',
            trend: 'up',
            subtitle: 'from last month',
            icon: DollarSign,
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your library.</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                                />
                            </div>

                            {/* Notifications */}
                            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                                <Bell className="w-5 h-5" />
                                {notifications > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                        {notifications}
                                    </span>
                                )}
                            </button>

                            {/* Settings */}
                            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>

                            {/* Profile */}
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsCards.map((card, index) => {
                        const IconComponent = card.icon;
                        return (
                            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                                        <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                                    </div>
                                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                                        card.trend === 'up' ? 'text-green-600' : 'text-red-500'
                                    }`}>
                                        {card.trend === 'up' ? (
                                            <TrendingUp className="w-4 h-4" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4" />
                                        )}
                                        <span>{card.change}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
                                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Monthly Revenue Chart */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Monthly Revenue</h2>
                            <p className="text-sm text-gray-600">Library membership and fees revenue</p>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyData}>
                                    <defs>
                                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                                    <YAxis tickLine={false} tick={{ fontSize: 12, fill: '#666' }} tickFormatter={(value) => `$${value}`} />
                                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} fill="url(#revenueGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Books Borrowed Trend */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Books Borrowed Trend</h2>
                            <p className="text-sm text-gray-600">Weekly borrowing activity</p>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={borrowingTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="week" tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                                    <YAxis tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                                    <Line
                                        type="monotone"
                                        dataKey="borrowed"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                                        activeDot={{ r: 8, fill: '#10b981' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* Quick Stats */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Books Available</span>
                                <span className="font-semibold text-gray-900">8,608</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Books on Loan</span>
                                <span className="font-semibold text-gray-900">342</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Overdue Books</span>
                                <span className="font-semibold text-red-600">23</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">New Members (This Month)</span>
                                <span className="font-semibold text-green-600">47</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Book returned: "The Great Gatsby"</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">New member registered</p>
                                    <p className="text-xs text-gray-500">15 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Book reserved: "1984"</p>
                                    <p className="text-xs text-gray-500">1 hour ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Overdue reminder sent</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Categories */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Fiction</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                                        <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <span className="text-sm text-gray-900">75%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Science</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                                        <div className="w-10 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-sm text-gray-900">62%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">History</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                                        <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                                    </div>
                                    <span className="text-sm text-gray-900">48%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Biography</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                                        <div className="w-6 h-2 bg-orange-500 rounded-full"></div>
                                    </div>
                                    <span className="text-sm text-gray-900">35%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
