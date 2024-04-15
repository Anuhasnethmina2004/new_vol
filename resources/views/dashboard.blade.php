<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    @if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif

@if (session('error'))
    <div class="alert alert-danger">
        {{ session('error') }}
    </div>
@endif

<script>
    $(document).ready(function() {
        // Auto-hide alert messages after 5 seconds
        setTimeout(function() {
            $('.alert').fadeOut('slow');
        }, 5000);
    });
</script>
@if(Auth::user()->is_admin==1) 
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="mt-4">
                <div class="flex flex-wrap -mx-6">
                    <div class="w-full px-6 sm:w-1/2 xl:w-1/4">
                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                            <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                                <svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                                </svg>
                            </div>

                            <div class="mx-5">
                                <h4 class="text-2xl font-semibold text-gray-700">{{ $projects_count }}</h4>
                                <div class="text-gray-500">Opportunities</div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 sm:mt-0">
                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                            <div class="p-3 rounded-full bg-green-600 bg-opacity-75">
                                <svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div class="mx-5">
                                <h4 class="text-2xl font-semibold text-gray-700">{{ $Category }}</h4>
                                <div class="text-gray-500">Abilities</div>
                            </div>
                        </div>
                    </div>

                    {{-- <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 sm:mt-0">
                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                            <div class="p-3 rounded-full bg-red-600 bg-opacity-75">
                                <svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div class="mx-5">
                                <h4 class="text-2xl font-semibold text-gray-700">{{ $closed_issues }}</h4>
                                <div class="text-gray-500">Closed Issues</div>
                            </div>
                        </div>
                    </div> --}}

                    <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 xl:mt-0">
                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                            <div class="p-3 rounded-full bg-gray-600 bg-opacity-75">
                                <svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>

                            <div class="mx-5">
                                <h4 class="text-2xl font-semibold text-gray-700">{{ $users_count }}</h4>
                                <div class="text-gray-500">Users</div>
                            </div>
                        </div>
                    </div>
                @else
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="flex flex-col">
                            {{-- @if (count($projects) < 1)
                                <h3 class="text-lg w-full text-center">You have no Projects</h3>
                            @else --}}
                            <div class="flex-grow overflow-auto">
                                <table class="relative w-full border table-fixed">
                                    {{-- <thead>/ --}}
                                        <tr>
                                            <th class="px-6 py-3 w-1/4 text-gray-900 bg-gray-100">Name</th>
                                            <th class="px-6 py-3 w-1/2 text-gray-900 bg-gray-100">Description</th>
                                            <th class="px-6 py-3 w-1/4 text-gray-900 bg-gray-100">Actions</th>
                                        </tr>
                                    {{-- </thead> --}}
                                    {{-- <tbody> --}}
                                        @foreach ($userProjects as $project)
                                            <tr>
                                                <!-- Ensure the widths here match the widths in the header -->
                                                <td class="px-6 py-3 w-1/4">{{ $project->title }}</td>
                                                <td class="px-6 py-3 w-1/2">{{ $project->description }}</td>
                                                <td class="px-6 py-3 w-1/4">
                                                    @if (!$project->start_time || $project->end_time)
                                                        <form action="{{ route('tasks.start', $project->id) }}" method="POST">
                                                            @csrf
                                                            <button type="submit" class="button is-icon w-inline-block">Start Task</button>
                                                        </form>
                                                    @else
                                                        <form action="{{ route('tasks.end', $project->id) }}" method="POST">
                                                            @csrf
                                                            <button type="submit" class="button is-icon w-inline-block">End Task</button>
                                                        </form>
                                                    @endif
                                                </td>
                                            </tr>
                                        @endforeach
                                    {{-- </tbody> --}}
                                </table>
                                
                                {{-- <table class="relative w-full border table-fixed">
                                    <thead>
                                        <tr>
                                            <th class="px-6 py-3 w-1/4 text-gray-900 bg-gray-100">Name</th>
                                            <th class="px-6 py-3 w-1/2 text-gray-900 bg-gray-100">Description</th>
                                            <th class="px-6 py-3 w-1/4 text-gray-900 bg-gray-100">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        @foreach ($userProjects as $project)
                                            <tr>
                                                <td>{{ $project->title }}</td>
                                                <td>{{ $project->description }}</td>
                                                <td>
                                                    @if (!$project->start_time || $project->end_time)
                                                        <form action="{{ route('tasks.start', $project->id) }}" method="POST">
                                                            @csrf
                                                            <button type="submit" class="button is-icon w-inline-block">Start Task</button>
                                                        </form>
                                                    @else
                                                        <form action="{{ route('tasks.end', $project->id) }}" method="POST">
                                                            @csrf
                                                            <button type="submit" class="button is-icon w-inline-block">End Task</button>
                                                        </form>
                                                    @endif
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table> --}}
                            </div>
                            
                            {{-- @endif --}}
                        </div>
                    </div>
                </div>
                @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
