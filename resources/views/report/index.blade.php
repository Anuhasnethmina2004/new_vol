<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Projects') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex justify-end mb-4">
                <a href={{ route('projects.create') }} type="button"
                    class="focus:outline-none text-gray-600 text-sm py-2.5 px-5 rounded-full border border-gray-600 hover:border-white hover:bg-indigo-400 hover:text-white transition-all duration-300 ease-linear">New
                    Project</a>
            </div>
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div class="flex flex-col">
                        {{-- @if (count($projects) < 1)
                            <h3 class="text-lg w-full text-center">You have no Projects</h3>
                        @else --}}
                        <div class="flex-grow overflow-auto">
                            <div class="container">
                                <h1>Projects</h1>
                                <table class="table" id="projects-table">
                                    <thead>
                                        <tr>
                                            <th>Project</th>
                                            <th>volunteer</th>
                                            <th>Date</th>
                                            <th>Starting Time</th>
                                            <th>Ending Time</th>
                                            <th>Number of hours</th>
                                            
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <script>
                               
                                $(document).ready(function() {
    $('#projects-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: '{{ route('report.data') }}', // Route to fetch data
        columns: [
            {
                data: 'project_name',
                name: 'project_name'
            },
            {
                data: 'user_name',
                name: 'user_name'
            },
            {
                data: 'date',
                name: 'date'
            },
            {
                data: 'start_time',
                name: 'start_time'
            },
            {
                data: 'end_time',
                name: 'end_time'
            },
            {
                data: null,
                render: function(data, type, row) {
                    // Calculate the number of hours
                    // Calculate the difference between start time and end time
                    var startTime = new Date('1970-01-01 ' + row.start_time);
                    var endTime = new Date('1970-01-01 ' + row.end_time);
                    var diffInMilliseconds = endTime - startTime;
                    
                    // Convert milliseconds to hours and minutes
                    var hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
                    var minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

                    // Format the result
                    var formattedHours = hours + ':' + ('0' + minutes).slice(-2);
                    return formattedHours;
                }
            }
        ]
    });
});

                            </script>
                        
                        </div>
                        {{-- @endif --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
