<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="theme-color" content="#050816">
        <title>Smapis Quant AI</title>
        @vite(['resources/css/app.css', 'resources/js/app.ts'])
    </head>
    <body>
        @php
            $pageState = [
                'old' => session()->getOldInput(),
                'errors' => $errors->getMessages(),
                'user' => auth()->user()?->only(['name', 'email', 'account_type', 'country']),
            ];
        @endphp
        <script>
            window.__APP_STATE__ = @json($pageState);
        </script>
        <div id="app"></div>
    </body>
</html>
