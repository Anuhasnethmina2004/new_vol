<x-app-layout>
    <x-slot name="header">
        {{-- <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ request()->routeIs('category.create') ? __('Create a New') : __('Edit') }} {{ __('Category') }}
        </h2> --}}
    </x-slot>
    <style>
        /* Add this CSS to your existing stylesheet or <style> tag */

        /* Grid System */
        .form-fieldset {
            display: flex;
            margin-bottom: 10px;
        }

        .form-fieldset-grid {
            display: flex;
            align-items: center;
            flex: 1;
        }

        /* Form Elements */
        .form-label {
            width: 100px;
            /* Adjust the width as needed */
            margin-right: 10px;
            text-align: right;
        }

        .form-input,
        .form-select {
            flex: 1;
            padding: 5px;
        }

        .photo {
            background-size: cover !important;
        }
    </style>
    {{-- <div class="py-12 xs:px-4"> --}}
    {{-- <div class="navbar navbar-inverse navbar-fixed-top" role="navigation"> --}}
    {{--
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">
                    <div class="heading">
                    <div class="logo">
                        <span class="logo-part">M</span>ultiplyer
                    </div>
                    </div>
                </a>
            </div>
            <div class="navbar-collapse collapse" style="height: 1px;">
            <ul class="custom nav navbar-nav navbar-right">
                <li>
                <div class="search">
                    <input type="search" class="search-bar" placeholder="Search..." style="font-weight:600;font-size:15px">
                    <i class="fa fa-search search-icon"></i>
                </div>
                </li>
                <li title="Dashboard"><a href="#">Dashboard</a></li>
                <li><a href="#"><span class="fa fa-cog">Settings</span></a></li>
                <li class="active" title="Profile"><a href="#"><span class="fa fa-user">Profile</span></a></li>
                <li title="Help"><a href="#"><span class="fa fa-question">Help</span></a></li>
                <li title="Logout"><a href="#"><span class="fa fa-sign-out">Logout</span></a></li>
            </ul>
            </div>
            </div>
        </div> --}}
    </div>
    <div class="wrapper">
        <div class="profile">
            <div class="content">
                <h1>Edit Profile</h1>
                <form action="{{ request()->routeIs('profile.create') ? route('profile.store', Auth::user()->id) : route('profile.update', Auth::user()->id) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <fieldset>
                        <div class="grid-65">
                            <span class="photo" title="Upload your Avatar!" style="background-image: url('/uploads/{{ Auth::user()->image }}')"></span>
                        </div>
                        <br>
                        <br><br>
                        <br>
                        <div class="form-fieldset-grid">
                            <label for="image" class="form-label">Image</label>
                            <input type="file" id="image" name="image" class="btn" onchange="previewImage(event)" accept="image/*" />
                        </div>
                    </fieldset>

                    <!-- Name -->
                    <fieldset class="form-fieldset">
                        <div class="form-fieldset-grid">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" id="name" name="name" tabindex="1" class="form-input" value="{{ Auth::user()->name }}" />
                        </div>
                    </fieldset>
                    <!-- Phone -->
                    <fieldset class="form-fieldset">
                        <div class="form-fieldset-grid">
                            <label for="phone" class="form-label">Phone</label>
                            <input type="text" id="phone" name="phone" tabindex="1" class="form-input" value="{{ Auth::user()->phone }}" />
                        </div>
                    </fieldset>
                    <!-- Email -->
                    <fieldset class="form-fieldset">
                        <div class="form-fieldset-grid">
                            <label for="email" class="form-label">Email</label>
                            <input type="text" id="email" name="email" tabindex="1" class="form-input" value="{{ Auth::user()->email }}" />
                        </div>
                    </fieldset>
                    <!-- Location -->
                    <fieldset class="form-fieldset">
                        <div class="form-fieldset-grid">
                            <label for="location" class="form-label">Location</label>
                            <select name="location" id="location" class="form-select">
                                <option value="kegalle" {{ Auth::user()->location == 'kegalle' ? 'selected' : '' }}>kegalle</option>
                                <option value="colombo" {{ Auth::user()->location == 'colombo' ? 'selected' : '' }}>colombo</option>
                                <option value="kandy" {{ Auth::user()->location == 'kandy' ? 'selected' : '' }}>kandy</option>
                            </select>
                        </div>
                    </fieldset>
                    <!-- Upgrade to Organization -->
                    <fieldset class="form-fieldset">
                        <div class="form-fieldset-grid">
                            <label for="is_admin" class="form-label">Upgrade To Organization</label>
                            <select name="is_admin" id="is_admin" class="form-select">
                                <option value="0" {{ Auth::user()->is_admin == 0 ? 'selected' : '' }}>Volunteer</option>
                                <option value="2" {{ Auth::user()->is_admin == 2 ? 'selected' : '' }}>Organization</option>
                            </select>
                        </div>
                    </fieldset>
                    <!-- Categories -->

                    <fieldset class="form-fieldset">
                        <div class="form-fieldset-grid">
                            <label for="location" class="form-label">Skills</label>
                            <select name="categories[]" id="categories" class="form-control" multiple>
                                @foreach ($categories as $category)
                                <option value="{{ $category->id }}" {{ in_array($category->id, $projectCategories) ? 'selected' : '' }}>
                                    {{ $category->title }}
                                </option>
                                @endforeach
                            </select>
                        </div>
                    </fieldset>

                    <fieldset class="form-fieldset">
                        {{-- <input type="button" class="Btn cancel" value="Cancel" /> --}}
                        <input type="submit" class="Btn" value="Save Changes" />
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    </div>
    </div>

    <!-- http://www.smashingmagazine.com/2013/08/08/release-livestyle-css-live-reload/ -->
    </div>
    <script>
        function previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imagePreview = document.querySelector('.photo');
                    imagePreview.style.backgroundImage = `url('${e.target.result}')`;
                    imagePreview.style.backgroundSize = 'cover';
                    imagePreview.style.backgroundPosition = 'center';
                }
                reader.readAsDataURL(file);
            } else {
                const imagePreview = document.querySelector('.photo');
                imagePreview.style.backgroundImage = `url('{{ Auth::user()->image }}')`;
                imagePreview.style.backgroundSize = 'cover';
                imagePreview.style.backgroundPosition = 'center';
            }
        }

        //Tabs Layout Code
        $("#tabs").tabs({
            activate: function(event, ui) {
                var active = $('#tabs').tabs('option', 'active');
                $("#tabid").html('the tab id is ' + $("#tabs ul>li a").eq(active).attr("href"));
            }
        });
    </script>
</x-app-layout>
