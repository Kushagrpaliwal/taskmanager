import Link from 'next/link';
import {
    Square,
    CheckSquare,
    MessageSquare,
    Clock,
    Layout,
    Users,
    Activity,
    Hash,
    ChevronRight,
    MoreHorizontal,
    Plus
} from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#2EAADC] selection:text-white">
            {/* Top Bar */}
            <nav className="h-12 border-b border-border flex items-center justify-between px-4 text-sm sticky top-0 bg-background/95 backdrop-blur z-50">
                <div className="flex items-center gap-1">
                    {/* Simple Text Logo */}
                    <div className="font-semibold text-[15px] flex items-center gap-2">
                        filOs
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6 text-muted-foreground">
                    <Link href="#" className="hover:text-foreground transition-colors">Product</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Templates</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Login</Link>
                    <Link href="/signup" className="text-foreground font-medium hover:underline decoration-border underline-offset-4">Get Filos free</Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 pt-20 pb-20">

                {/* Hero Section */}
                <div className="mb-24 space-y-6">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <span className="opacity-50">filos / workspace</span>
                    </div>

                    <h1 className="text-6xl font-bold tracking-tight text-primary leading-[1.1]">
                        One workspace.<br />
                        Every task.
                    </h1>

                    <p className="text-xl text-primary font-light max-w-xl leading-relaxed">
                        Tasks, teams, chat, and activity — all in one flexible workspace designed for focus.
                    </p>

                    <div className="flex items-center gap-6 pt-4">
                        <Link href="/signup" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-[4px] font-medium hover:bg-primary/90 transition-colors">
                            Get Filos free <ChevronRight className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-muted-foreground">
                            View demo
                        </Link>
                    </div>
                </div>

                <div className="h-px bg-border w-full mb-24" />

                {/* Workspace Preview - Mock Notion UI */}
                <div className="mb-32">
                    <div className="border border-border rounded-lg overflow-hidden flex flex-col md:flex-row h-[500px] shadow-sm bg-white">

                        {/* Sidebar */}
                        <div className="w-[240px] bg-[#F7F7F5] border-r border-[#E5E5E5] p-3 hidden md:flex flex-col gap-1">
                            <div className="flex items-center gap-2 px-2 py-1 mb-4">
                                <div className="w-5 h-5 bg-orange-400 rounded-[3px] text-[10px] text-white flex items-center justify-center font-bold">F</div>
                                <span className="text-sm font-medium text-[#37352f]">Filos Team</span>
                            </div>

                            <div className="space-y-[2px]">
                                {[
                                    { icon: Layout, label: "Dashboard" },
                                    { icon: Users, label: "Teams" },
                                    { icon: CheckSquare, label: "Tasks" },
                                    { icon: Square, label: "Roadmap" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 px-2 py-1.5 text-sm text-[#5f5e5b] hover:bg-[#e6e6e5] rounded-[4px] cursor-pointer">
                                        <item.icon className="w-4 h-4 opacity-70" />
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 mb-2 px-2 text-xs font-semibold text-[#9B9A97]">FAVORITES</div>
                            <div className="space-y-[2px]">
                                <div className="flex items-center gap-3 px-2 py-1.5 text-sm text-[#5f5e5b] hover:bg-[#e6e6e5] rounded-[4px] cursor-pointer">
                                    <span className="w-4 flex justify-center text-lg leading-none">🚀</span>
                                    <span>Launch V2</span>
                                </div>
                                <div className="flex items-center gap-3 px-2 py-1.5 text-sm text-[#5f5e5b] hover:bg-[#e6e6e5] rounded-[4px] cursor-pointer">
                                    <span className="w-4 flex justify-center text-lg leading-none">🎨</span>
                                    <span>Design Sys</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Mock Content */}
                        <div className="flex-1 p-8 md:p-12 overflow-hidden relative">
                            <div className="max-w-2xl mx-auto">
                                {/* Cover / Icon Area */}
                                <div className="mb-8 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group">
                                    <div className="text-5xl mb-4 group-hover:-translate-y-1 transition-transform origin-bottom-left">🏔️</div>
                                </div>

                                <h2 className="text-4xl font-bold text-[#37352f] mb-8">Q1 Engineering Roadmap</h2>

                                {/* Toolbar */}
                                <div className="flex items-center gap-4 text-sm text-[#787774] mb-8 border-b border-[#E5E5E5] pb-2">
                                    <span className="hover:bg-[#efefef] px-1 rounded cursor-pointer">Board View</span>
                                    <span className="hover:bg-[#efefef] px-1 rounded cursor-pointer text-[#37352f] font-medium border-b-2 border-black pb-2 -mb-2.5">Table View</span>
                                    <span className="hover:bg-[#efefef] px-1 rounded cursor-pointer">Timeline</span>
                                    <div className="ml-auto flex gap-2">
                                        <span className="text-blue-500">New</span>
                                        <MoreHorizontal className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Table Rows */}
                                <div className="space-y-0">
                                    {[
                                        { task: "Database Migration", tag: "Backend", tagColor: "bg-red-100 text-red-700", status: "In Progress" },
                                        { task: "Update Landing Page", tag: "Frontend", tagColor: "bg-purple-100 text-purple-700", status: "Done" },
                                        { task: "Mobile Auth Flow", tag: "Mobile", tagColor: "bg-yellow-100 text-yellow-700", status: "Not Started" },
                                        { task: "User Interviews", tag: "Product", tagColor: "bg-blue-100 text-blue-700", status: "In Progress" }
                                    ].map((row, i) => (
                                        <div key={i} className="group flex items-center py-2 border-b border-[#efefef] hover:bg-[#fbfbfa] px-2 -mx-2">
                                            <div className="w-[30px] opacity-0 group-hover:opacity-100 text-[#9B9A97] cursor-grab">
                                                <div className="i-drag-handle">⋮⋮</div>
                                            </div>
                                            <div className="flex-1 font-medium text-[#37352f] flex items-center gap-2">
                                                <Square className="w-4 h-4 text-[#d3d3d3]" />
                                                {row.task}
                                            </div>
                                            <div className="w-[120px]">
                                                <span className={`text-xs px-1.5 py-0.5 rounded-[3px] ${row.tagColor}`}>{row.tag}</span>
                                            </div>
                                            <div className="w-[100px] text-sm text-[#37352f] opacity-80">
                                                {row.status}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-center py-2 px-2 -mx-2 text-[#9B9A97] hover:bg-[#efefef] cursor-pointer">
                                        <Plus className="w-4 h-4 mr-2" /> New
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4 italic">
                        The interface you know. The power you need.
                    </p>
                </div>

                <div className="h-px bg-border w-full mb-24" />

                {/* Features Checklist */}
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 mb-32">
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <CheckSquare className="w-5 h-5 text-foreground mt-0.5" />
                            <h3 className="font-semibold text-lg text-foreground">Tasks & Projects</h3>
                        </div>
                        <p className="text-muted-foreground pl-8 leading-relaxed">
                            Organize work using flexible task lists and customizable statuses. Switch between list, board, and calendar views seamlessly.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-foreground mt-0.5" />
                            <h3 className="font-semibold text-lg text-foreground">Team Collaboration</h3>
                        </div>
                        <p className="text-muted-foreground pl-8 leading-relaxed">
                            Assign, discuss, and track progress together. @mention team members to get their attention right where the work is happening.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <MessageSquare className="w-5 h-5 text-foreground mt-0.5" />
                            <h3 className="font-semibold text-lg text-foreground">Real-time Chat</h3>
                        </div>
                        <p className="text-muted-foreground pl-8 leading-relaxed">
                            Conversations live next to the work. No more jumping between tools to context switch. It's all right here.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <Activity className="w-5 h-5 text-foreground mt-0.5" />
                            <h3 className="font-semibold text-lg text-foreground">Activity Tracking</h3>
                        </div>
                        <p className="text-muted-foreground pl-8 leading-relaxed">
                            See changes as they happen. A transparent history of who changed what and when, keeping everyone in sync.
                        </p>
                    </div>
                </div>

                <div className="h-px bg-border w-full mb-24" />

                {/* Use Cases - Plain Text Grid */}
                <div className="mb-32">
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-8">Built for</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="space-y-1 group cursor-pointer">
                            <div className="text-foreground font-medium group-hover:underline decoration-1 underline-offset-4">Developers</div>
                            <div className="text-sm text-muted-foreground">Track bugs & sprints</div>
                        </div>
                        <div className="space-y-1 group cursor-pointer">
                            <div className="text-foreground font-medium group-hover:underline decoration-1 underline-offset-4">Remote Teams</div>
                            <div className="text-sm text-muted-foreground">Async collaboration</div>
                        </div>
                        <div className="space-y-1 group cursor-pointer">
                            <div className="text-foreground font-medium group-hover:underline decoration-1 underline-offset-4">Startups</div>
                            <div className="text-sm text-muted-foreground">Move fast, stay organized</div>
                        </div>
                        <div className="space-y-1 group cursor-pointer">
                            <div className="text-foreground font-medium group-hover:underline decoration-1 underline-offset-4">Productivity</div>
                            <div className="text-sm text-muted-foreground">Personal task mastery</div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center space-y-6 pb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Get started with a workspace<br />that adapts to how you think.
                    </h2>
                    <div className="pt-2">
                        <Link href="/signup" className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-[4px] font-medium hover:opacity-90 transition-opacity">
                            Get Filos free <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

            </main>

            {/* Minimal Footer */}
            <footer className="border-t border-border py-12 px-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="space-y-4">
                        <div className="font-semibold text-[15px] flex items-center gap-2">
                            filOs
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            © 2026 Filos Inc. <br />
                            Better workspaces for better work.
                        </p>
                    </div>
                    <div className="flex gap-12 text-sm">
                        <div className="space-y-3 flex flex-col">
                            <span className="font-medium text-foreground">Product</span>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">Download</Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">Updates</Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link>
                        </div>
                        <div className="space-y-3 flex flex-col">
                            <span className="font-medium text-foreground">Company</span>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">About</Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link>
                        </div>
                        <div className="space-y-3 flex flex-col">
                            <span className="font-medium text-foreground">Legal</span>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy</Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">Terms</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}