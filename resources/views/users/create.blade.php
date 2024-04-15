<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ request()->routeIs('projects.create') ? __('Create a New') : __('Edit') }} {{ __('Project') }}
        </h2>
    </x-slot>

    <div class="py-12 xs:px-4">
        <div class="max-w-3xl mx-auto px-4 lg:px-8">
            <form action="{{ request()->routeIs('projects.create') ? route('projects.store') : route('projects.update', $project->id) }}" method="POST">
                @csrf
                @if (!request()->routeIs('projects.create'))
                    <input type="hidden" name="_method" value="PUT">
                @endif
                <div class="border-t border-b border-gray-300 py-8">
                    <div class="md:w-2/3 w-full mb-6">
                        <label for="title" class="block text-sm font-bold text-gray-700">
                            Project Title
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="title" id="title" value="{{ $project->title }}"
                                class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                placeholder="Project Title">
                        </div>
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-bold text-gray-700">
                            Description <span class="text-xs text-gray-500">(Optional)</span>
                        </label>
                        <div class="mt-1">
                            <textarea id="description" name="description" rows="7"
                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md">{{ $project->description }}</textarea>
                        </div>
                    </div>
                    <div class="md:w-2/3 w-full mb-6">
                        <label for="title" class="block text-sm font-bold text-gray-700">
                            Group Link
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="link" id="title" value="{{ $project->link }}"
                                class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                placeholder="Whatsapp or Telegram Group Link">
                        </div>
                    </div>
                    <div class="md:w-2/3 w-full mb-6">
                        <label for="starting_date" class="block text-sm font-bold text-gray-700">
                            Starting Date
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="date" name="starting_date" id="starting_date" value="{{ $project->starting_date }}"
                                   class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                   placeholder="YYYY-MM-DD">
                        </div>
                    </div>
                    <div class="md:w-2/3 w-full mb-6">
                        <label for="end_date" class="block text-sm font-bold text-gray-700">
                            End Date
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="date" name="end_date" id="end_date" value="{{ $project->end_date }}"
                                   class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                   placeholder="YYYY-MM-DD">
                        </div>
                    </div>
                    <div class="md:w-2/3 w-full mb-6">
                        <label for="number_of_hours" class="block text-sm font-bold text-gray-700">
                            Number of Hours
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="number" name="number_of_hours" id="number_of_hours" value="{{ $project->number_of_hours }}"
                                   class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                   placeholder="Number of Hours">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="categories">Location:</label>
                        <select name="location" id="location" class="form-control" >
                            {{-- @foreach(Config::get('constants.SRI_LANKA_CITIES') as$key=> $city) --}}
                          <option value="kegalle">kegalle</option>
                          <option value="colombo">colombo</option>
                          <option value="kandy">kandy</option>
                          {{-- <option value="kegalle">kegalle</option> --}}
                          {{-- @endforeach --}}
                         </select>
                    </div>

                    <div class="form-group">
                        <label for="categories">Select Categories:</label>
                        <select name="categories[]" id="categories" class="form-control" multiple>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ in_array($category->id, $projectCategories) ? 'selected' : '' }}>
                                    {{ $category->title }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="type">Select Type:</label>
                        <select name="type" id="type" class="form-control" >
                            <option value="1" >Project</option>
                                <option value="2" >Event</option>
                         </select>
                    </div>
                    
                    
                                                            
                </div>
                <div class="mt-6 sm:mt-4">
                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {{ request()->routeIs('projects.create') ? __('Create') : __('Save') }} {{ __('Project') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>
