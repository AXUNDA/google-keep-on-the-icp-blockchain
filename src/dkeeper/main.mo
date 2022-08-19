import List  "mo:base/List";
import Debug "mo:base/Debug";
import Text "mo:base/Text";


actor Dkeeper{
      public type Note = {
            title:Text;
            content:Text;
      };
      var notes :List.List<Note> = List.nil<Note>();
      public func createNewNote(titleText:Text,contentText:Text){
            let newNote : Note = {
                  title=titleText;
                  content=contentText;
            };
           notes:= List.push(newNote,notes);
           Debug.print(debug_show(notes));
      };
      public query func getNotes(): async [Note]{
            return List.toArray(notes);
      };
      public func removeNote(id:Nat){
            // motoko indexing starts from 0
            // Taking items in front of the item
            let listFront = List.take(notes,id);
            // dropping the item
            let listBack = List.drop(notes,id+1);
            notes := List.append(listBack,listFront)
           

      };
  
}