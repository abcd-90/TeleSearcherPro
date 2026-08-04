Set WshShell = CreateObject("WScript.Shell")
strPath = WScript.ScriptFullName
strFolder = CreateObject("Scripting.FileSystemObject").GetParentFolderName(strPath)
WshShell.Run "cmd /c start """" """ & strFolder & "\index.html""", 0, False
