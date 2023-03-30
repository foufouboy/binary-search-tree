
function Tree() {
    let root = null;

    const buildFrom = (arr, node = root) => {
        if (!arr.length) {
            return;
        }
        
        const currentValue = arr[0];

        if (!root) {
            root = Node(currentValue);
        } else {
            if (currentValue < node.value) {
                if (node.left) {
                    buildFrom(arr, node.left);
                    return;
                } else {
                    node.left = Node(currentValue);
                }
            } else {
                if (node.right) {
                    buildFrom(arr, node.right);
                    return;
                } else {
                    node.right = Node(currentValue);
                }
            }
        }
        buildFrom(arr.slice(1), root)
    }

    //  Si le tableau est vide : fin de fonction
    //  Si nous n'avons pas de noeud racine : 
    //      Notre racine est un nouveau noeud ayant la valeur actuelle
    //  Sinon :
    //      Si notre valeur actuelle est inférieure à la valeur du noeud actuel :
    //          Si le noeud de gauche existe :
    //              On recommence la fonction depuis le noeud de gauche
    //          Sinon (le noeud est vide) : 
    //              le noeud de gauche devient un nouveau noeud avec la valeur actuelle
    //      Sinon :
    //          Même chose qu'au dessus mais pour le noeud de droite
    //  On recommence avec la valeur suivante du tableau

    const balancedFrom = (arr) => {

        if (arr.length === 0) {
            return null;
        }

        const middle = Math.floor(arr.length / 2);
        const currentNode = Node(arr[middle]);

        if (!root) root = currentNode;

        currentNode.left = balancedFrom(arr.slice(0, middle));
        currentNode.right = balancedFrom(arr.slice(middle + 1));

        return currentNode;
    }

    //      Si le tableau est vide :
    //          fin de fonction
    //
    //      Le noeud courant = la médiante du tableau
    //
    //      Si le noeud racine n'existe pas :
    //          le noeud racine = le noeud courant;
    //
    //      Le noeud de droite = la médiante de la partie droite du tableau
    //      Le noeud de gauche = la médiante de la partie droite du tableau
    //
    //      retourner le noeud
    
    const findMin = (node) => {
        if (!node.left) return node;
        return findMin(node.left);
    }

    const find = (value, node = root) => {
        if (value < node.value) {
            return find(value, node.left); 
        } else if (value > node.value) {
            return find(value, node.right); 
        } else {
            return node;
        }
    }

    const height = (node = root) => {
        if (node === null) {
            return 0;
        }

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        if (leftHeight > rightHeight) {
            return leftHeight + 1;
        } else {
            return rightHeight + 1;
        }
    }

    const depth = (node, root = root) => {
        if (node.value < root.value) {
            return depth(node, root.left) + 1;
        } else if (node.value > root.value) {
            return depth(node, root.right) + 1;
        } else {
            return 0;
        }
    }

    const insert = (value, node = root) => { 
        if (!root) root = Node(value);
        else {
            if (value < node.value) {
                if (node.left) {
                    insert(value, node.left);
                } else {
                    node.left = Node(value);
                }
            } else {
                if (node.right) {
                    insert(value, node.right);
                } else {
                    node.right = Node(value);
                }
            }
        }
    }

    // Si la valeur est plus petite que celle du noeud actuel :
    // Si le noeud de gauche existe, faire la même chose avec le noeud de droite
    // Sinon mettre à droite
    // Si le noeud de droite existe, faire la même chose avec le noeud de droite

    const deleteNode = (value, node = root) => {
        if (!node) { // Si le noeud n'existe pas...
            return null;
        }
        

        if (value < node.value) { // recherche du noeud
            node.left = deleteNode(value, node.left) 
        } else if (value > node.value) {
            node.right = deleteNode(value, node.right)  
        } else { // Le noeud est trouvé
            if (node.left === null && node.right === null) { // Le noeud n'a pas d'enfants
                node = null;
            } else if (node.left === null) { // Le noeud a un enfant
                node = node.right;
                node.right = null;
            } else if (node.right === null) {
                node = node.left;
                node.left = null;
            } else { // le noeud a deux enfants
                let temp = findMin(node.right);
                node.value = temp.value;
                node.right = deleteNode(temp.value, node.right);
            }
        }

        return node;
    }

    //  Si le noeud à supprimer n'a aucun enfant
    //      Le supprimer
    //  Si le noeud à supprimer a un enfant
    //     Remplacer sa valeur par celle de son enfant
    //     supprimer l'enfant
    //  Si le noeud à supprimer a deux enfants
    //      Trouver la valeur supérieure la plus petite du noeud
    //      Remplacer la valeur du noeud à supprimer par celle de ce noeud
    //      Supprimer ce noeud (action récursive)

    const inorder = (f = null, node = root, arr = []) => {
        if (!node) {
            return;
        } else {
            if (!f) {
                f = (node) => {arr.push(node.value)}; 
            }

            inorder(f, node.left);
            f(node);
            inorder(f, node.right);

            return arr;
        }
    }

    const preorder = (f = null, node = root, arr = []) => {
        if (!node) {
            return;
        } else {
            if (!f) {
                f = (node) => {arr.push(node.value)}; 
            }

            f(node);
            preorder(f, node.left);
            preorder(f, node.right);

            return arr;
        }
    }

    const postorder = (f = null, node = root, arr = []) => {
        if (!node) {
            return;
        } else {
            if (!f) {
                f = (node) => {arr.push(node.value)}; 
            }

            postorder(f, node.left);
            postorder(f, node.right);
            f(node);

            return arr;
        }
    }

    const levelOrder = (f = console.log, node = root) => {
        if (node == null) return;
        const queue = [node];

        while (queue.length) {
            currentNode = queue.shift();
            f(currentNode.value);
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
    }

    // On visite le noeud actuel,
    // On le dequeue,
    // on enqueue ses enfants (si ils ne sont pas égaux à null),
    // on passe au noeud suivant de la queue

    const rebalance = () => {
        sortedValues = inorder();
        root = null;

        balancedFrom(sortedValues);
    }

    //  Pour chaque noeud :
    //      Lire le noeud de gauche
    //      Visiter le noeud
    //      Lire le noeud de droite
    //
    //  Fonction par défaut : retourner un tableau avec toutes les valeurs de l'arbre
    //  Comment renvoyer un tableau avec toutes les valeurs de l'arbre ?
    //  

    const prettyPrint = (node = root, prefix = '', isLeft = true) => {

        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);

        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    function Node(value) {
        return {left: null, right: null, value};
    }

    return {
        buildFrom, 
        prettyPrint, 
        balancedFrom, 
        insert,
        deleteNode, 
        find, 
        inorder, 
        preorder,
        postorder, 
        levelOrder, 
        rebalance, 
        height,
        get root() {
            return root;
        }
    };
}

const arr = [1, 4, 3, 6, 5, 2, 8, 7, 9, 10, 11, 12];
const myTree = Tree();
myTree.buildFrom(arr);
myTree.prettyPrint();
myTree.rebalance();
myTree.insert(1);
console.log(myTree.height());
myTree.prettyPrint();
