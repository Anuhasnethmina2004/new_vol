<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ request()->routeIs('category.create') ? __('Create a New') : __('Edit') }} {{ __('Category') }}
        </h2>
    </x-slot>

    <div class="py-12 xs:px-4">
        <div class="max-w-3xl mx-auto px-4 lg:px-8">
            <form action="{{ request()->routeIs('category.create') ? route('category.store') : route('category.update', $category->id) }}" method="POST">
                @csrf
                @if (!request()->routeIs('category.create'))
                    <input type="hidden" name="_method" value="PUT">
                @endif
                <div class="border-t border-b border-gray-300 py-8">
                    <div class="md:w-2/3 w-full mb-6">
                        <label for="title" class="block text-sm font-bold text-gray-700">
                            Ability Title
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="title" id="title" value="{{ $category->title }}"
                                class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                placeholder="Category Title">
                        </div>
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-bold text-gray-700">
                            Description <span class="text-xs text-gray-500">(Optional)</span>
                        </label>
                        <div class="mt-1">
                            <textarea id="description" name="description" rows="7"
                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md">{{ $category->description }}</textarea>
                        </div>
                    </div>
                    
                                                            
                </div>
                <div class="mt-6 sm:mt-4">
                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {{ request()->routeIs('category.create') ? __('Create') : __('Save') }} {{ __('Category') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>
