<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-end">
            <div>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    {{ __($categories->title) }}
                </h2>
                <span class="text-sm font-light text-gray-400">Update {{ $categories->created_at }}</span>

                <br> <h4 class="font-semibold text-xl text-gray-800 ">
                    {{ $categories->description }}
                </h4>
                {{-- <label class="px-6 py-4 text-center"></label> --}}
            </div>
          
        </div>
    </x-slot>

    
</x-app-layout>
