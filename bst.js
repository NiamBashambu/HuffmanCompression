const { exit } = require("process");
 class BSTNode{
    constructor(data){
        //data element
        this.data = data;
        //left and right nodes
        this.left = null;
        this.right = null;
    }

    
};
 class BST {
  
   
    #root = null;


   // comparator must be a function(a,b)
   // which returns:
   // < 0 if a < b
   // = 0 if a == b
   // > 0 if a > b
   comparator = function(a,b){
      
   }
  constructor(comparator) {
      this.root = null;
      if (comparator) {
        this.comparator = comparator;
      }
    
      
     
      }
     
  
  

  /**
   * Adding a node to the bst
   **/
  add(data) {
      let r = this.root;
      let node = new BSTNode(data);
      while (r !== null) {
        if(r.data.name >= node.data.name) {
          if(r.left === null) {
            r.left = node;
            break;
          } else {
            r = r.left;
          }
        } else {
          if(r.right === null) {
            r.right = node;
            break;
          } else {
            r = r.right;
          }
        }
      }
      if(r === null) {
        this.root = node;
      }
    }


      //remove method done in class with Mr.Sea
  remove(data){
    function removeNode(parent, remove) {
        let isLeftChild = true
        if(parent.right === remove) {
          isLeftChild = false
        }
        let pointHere = remove.left
        if(remove.left === null) {
          pointHere = remove.right
        }
        if(isLeftChild) {
          parent.left = pointHere
        } else {
          parent.right = pointHere
        }
        return remove.data
      }
      let p = null
      let r = this.root
      while(r !== null) {
        if(this.comparator(r.data, data) < 0) {
          p = r
          r = r.right
        } else if(this.comparator(r.data, data) > 0) {
          p = r
          r = r.left
        } else {
          if(p === null && r.left !== null && r.left !== null) {
            //do the root thing 
            let rightLeftChild = r.left
            let parentRightLeftChild = r
            while(rightLeftChild.right !== null) {
              parentRightLeftChild = rightLeftChild
              rightLeftChild = rightLeftChild.right
            }
            let t = r.data
            r.data = rightLeftChild.data
            rightLeftChild.data = t
            return removeNode(parentRightLeftChild, rightLeftChild)
          } else {
            if(r.left !== null && r.right !== null) {
            
            let rp = r
            let removeOne = rp.left
            while(removeOne.right !== null) {
              rp = removeOne
              removeOne = removeOne.right
            }
            let t = r.data
            r.data = removeOne.data
            removeOne.data = t
            return removeNode(rp, removeOne)
            } else {
              return removeNode(p, r)
            }
          }
        }
      }
      return data
    }
  

  /*
  *in order traversal
  */
  /*bilal helped with this*/
  inOrder() {
    const rList = [];
    const inOrderHelper = (node) => {
        if (node?.left) inOrderHelper(node.left);
        if (node) rList.push(node.data);
        if (node?.right) inOrderHelper(node.right);
    };
    inOrderHelper(this.root);
    return rList;
}
}

module.exports = BST;