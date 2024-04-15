<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-end">
            <div>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                   Users
                </h2>
                {{-- <span class="text-sm font-light text-gray-400">Update {{ $project->created_at }}</span> --}}
                <style>.linka {
                    box-shadow: inset 0 0 0 0 #54b3d6;
                    color: #54b3d6;
                      padding: 0 .25rem;
                      margin: 0 -.25rem;
                    transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
                  }
                  .linka:hover {
                    color: #fff;
                    box-shadow: inset 700px 0 0 0 #54b3d6;;
                  }
                  
                  /* Presentational styles */
                  .linka {
                      color: #54b3d6;
                    font-family: 'Poppins', sans-serif;
                    font-size: 27px;
                      font-weight: 700;
                    line-height: 1.5;
                    text-decoration: none;
                  }</style>
              
        </div>
    </x-slot>
    {{-- @if(Auth::user()->is_admin==1||Auth::user()->is_admin==2)  --}}
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex justify-between items-end mb-4">
                <h2 class="text-lg font-light">Volunteers</h2>
                {{-- <a href={{ route('issues.create') }} type="button"
                    class="focus:outline-none text-gray-600 text-sm py-2.5 px-5 rounded-full border border-gray-600 hover:border-white hover:bg-indigo-400 hover:text-white transition-all duration-300 ease-linear">New
                    Issue</a> --}}
            </div>
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div class="flex flex-col">
                        {{-- @if (count($projects) < 1)
                            <h3 class="text-lg w-full text-center">You have no Projects</h3>
                        @else --}}
                        <div class="flex-grow overflow-auto">
                            <table class="relative w-full border table-fixed">
                                <thead>
                                    <tr>
                                        <th class="px-6 py-3 w-1/4 text-gray-900 bg-gray-100">Name</th>
                                        <th class="px-6 py-3 w-1/2 text-gray-900 bg-gray-100">Phone number</th>
                                        <th class="px-6 py-3 w-1/4 text-gray-900 bg-gray-100">Email</th>
                                        <th class="px-6 py-3 w-1/4 text-gray-900 bg-gray-100">Location</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y">
                                    @foreach ($enrolledUsers as $user)
                                        <tr>
                                            <td class="px-6 py-4 text-left">
                                                <h2 class="font-bold">{{ $user->name }}</h2>
                                                <span class="text-sm font-light text-gray-400">Updated
                                                    {{ \Carbon\Carbon::parse($user->created_at)->diffForHumans() }}</span>
                                            </td>
                                            <td class="px-6 py-4 text-center">{{ $user->phone }}</td>
                                            <td class="px-6 py-4 text-center">
                                                {{-- @foreach ($issue->users as $user)
                                                    <a href="#" class="font-bold">{{ $user->name }}</a>
                                                    @if (!$loop->last)
                                                        </br>
                                                    @endif
                                                @endforeach --}}
                                                {{$user->email}}
                                            </td>
                                            <td class="px-6 py-4 text-center">
                                               {{ $user->location}}
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        {{-- @endif --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- @endif --}}
</x-app-layout>
